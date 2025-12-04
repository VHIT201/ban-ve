// Core
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash-es/debounce";

import {
  SearchIcon,
  FileIcon,
  TrendingUpIcon,
  XIcon,
  LoaderCircle,
  MicIcon,
  MicOffIcon,
} from "lucide-react";

// App
import { useGetApiSearch } from "@/api/endpoints/search";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GetApiSearch200 } from "@/api/models";
import { cn } from "@/utils/ui";
import { toast } from "sonner";

// Types
declare global {
  interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: Event) => void;
    onend: () => void;
    start: () => void;
    stop: () => void;
  }

  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SearchResult {
  _id?: string;
  title?: string;
  description?: string;
  field?: string;
  file_type?: string;
}

const HeaderContentSearch = () => {
  // Hooks
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // States
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isListening, setIsListening] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<any>(null);

  // Debounced search handler
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedQuery(value);
      }, 500),
    []
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Queries
  const getSearchContentQuery = useGetApiSearch(
    { q: debouncedQuery },
    {
      query: {
        enabled: debouncedQuery.trim().length > 0,
        select: (data) => (data as GetApiSearch200).data || [],
      },
    }
  );

  const searchResults = (getSearchContentQuery.data as SearchResult[]) || [];
  const isLoading = getSearchContentQuery.isFetching;

  // Reset silence timer
  const resetSilenceTimer = useCallback(() => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
    }
    
    silenceTimerRef.current = setTimeout(() => {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
      setIsProcessing(false);
    }, 3000); // Auto-stop after 3 seconds of silence
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'vi-VN';

      recognition.onresult = (event: any) => {
        setIsProcessing(false);
        const results = event.results;
        const transcript = Array.from({ length: results.length }, (_, i) => results[i])
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join('');
        
        // Reset the silence timer whenever we get new speech input
        if (transcript.trim()) {
          // Stop listening and clean up
          if (recognitionRef.current) {
            recognitionRef.current.stop();
          }
          setIsListening(false);
          setIsProcessing(false);
          if (silenceTimerRef.current) {
            clearInterval(silenceTimerRef.current);
            silenceTimerRef.current = null;
          }
          
          // Update search query and show success message
          setSearchQuery(transcript);
          debouncedSearch(transcript);
          
          // No toast on successful recognition to be less intrusive
        }
      };

      recognition.onerror = (event: Event) => {
        console.error('Speech recognition error', event);
        setIsListening(false);
      };

      recognition.onend = () => {
        if (isListening) {
          recognition.start();
        }
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
    };
  }, [debouncedSearch, isListening]);

  // Toggle speech recognition
  const toggleSpeechRecognition = useCallback(() => {
    if (!recognitionRef.current) {
      toast.error('Trình duyệt không hỗ trợ nhận dạng giọng nói');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setIsProcessing(false);
      if (silenceTimerRef.current) {
        clearInterval(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }
      // No toast when stopping manually
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        setIsProcessing(true);
        resetSilenceTimer();
        
        // No toast when starting to listen, visual indicator is enough
      } catch (error) {
        console.error('Speech recognition error:', error);
        setIsListening(false);
        setIsProcessing(false);
        // Only show error toast for actual errors
        toast.error('Không nhận dạng được giọng nói. Vui lòng thử lại.', {
          position: 'bottom-center',
          style: {
            marginBottom: '1rem',
            zIndex: 100,
            background: '#fff',
            color: '#ef4444',
            border: '1px solid #fecaca',
            padding: '8px 12px',
            borderRadius: '6px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }
        });
      }
    }
  }, [isListening]);

  // Methods
  const handleSearch = useCallback(
    (query: string) => {
      if (query.trim()) {
        navigate(`/collections?search=${encodeURIComponent(query)}`);
        setIsOpen(false);
        setSearchQuery("");
        setDebouncedQuery("");
        inputRef.current?.blur();
      }
    },
    [navigate]
  );

  const handleResultClick = useCallback(
    (contentId: string) => {
      navigate(`/detail/${contentId}`);
      setIsOpen(false);
      setSearchQuery("");
      setDebouncedQuery("");
      inputRef.current?.blur();
    },
    [navigate]
  );

  const handleClear = useCallback(() => {
    setSearchQuery("");
    setDebouncedQuery("");
    debouncedSearch.cancel();
    setSelectedIndex(-1);
    inputRef.current?.focus();
  }, [debouncedSearch]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < searchResults.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0 && searchResults[selectedIndex]) {
            handleResultClick(searchResults[selectedIndex]._id || "");
          } else if (searchQuery.trim()) {
            handleSearch(searchQuery);
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          inputRef.current?.blur();
          break;
      }
    },
    [
      isOpen,
      searchResults,
      selectedIndex,
      searchQuery,
      handleSearch,
      handleResultClick,
    ]
  );

  // Effects
  useEffect(() => {
    if (debouncedQuery.trim().length > 0) {
      setIsOpen(true);
      setSelectedIndex(-1);
    } else {
      setIsOpen(false);
    }
  }, [debouncedQuery]);

  // Template
  return (
    <div className="flex-1 max-w-xl mx-6">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="relative group">
            {/* Search Icon */}
            <SearchIcon
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-200 z-10 pointer-events-none",
                isOpen
                  ? "text-primary"
                  : "text-muted-foreground group-focus-within:text-primary"
              )}
            />

            {/* Input */}
            <Input
              ref={inputRef}
              type="text"
              placeholder="Tìm kiếm bản vẽ theo tên, lĩnh vực..."
              className={cn(
                "pl-10 pr-20 h-10 rounded-full border-border/40 bg-background/50",
                "focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary/40",
                "placeholder:text-muted-foreground/60 transition-all duration-200",
                "hover:border-border/60 hover:bg-background/80"
              )}
              value={searchQuery}
              onChange={(e) => {
                const value = e.target.value;
                setSearchQuery(value);
                debouncedSearch(value);
              }}
              onFocus={() => debouncedQuery.trim() && setIsOpen(true)}
              onKeyDown={handleKeyDown}
            />

            {/* Action Buttons */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center gap-1">
              {searchQuery && (
                <button
                  onClick={handleClear}
                  className="hover:bg-muted rounded-full p-1.5 transition-colors"
                  type="button"
                >
                  <XIcon className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
                </button>
              )}
              
              {isSpeechSupported && (
                <button
                  type="button"
                  onClick={toggleSpeechRecognition}
                  className={cn(
                    "rounded-full p-1.5 transition-all duration-300 relative",
                    isListening 
                      ? "text-white bg-red-500 shadow-lg shadow-red-500/30" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                    isListening && "ring-2 ring-offset-2 ring-red-500"
                  )}
                  disabled={isLoading}
                  title={isListening ? "Đang nghe..." : "Nhấn để nói"}
                >
                  <div className="relative">
                    {isListening ? (
                      <div className="relative">
                        <div className="absolute -inset-1.5 bg-red-500/20 rounded-full animate-ping"></div>
                        <MicOffIcon className="h-4 w-4 relative" />
                      </div>
                    ) : (
                      <MicIcon className="h-4 w-4" />
                    )}
                  </div>
                </button>
              )}
              
              {isLoading && (
                <div className="p-1.5">
                  <LoaderCircle className="h-4 w-4 animate-spin text-primary" />
                </div>
              )}
            </div>
          </div>
        </PopoverTrigger>

        <PopoverContent
          className="w-(--radix-popover-trigger-width) p-0 rounded-2xl"
          align="start"
          sideOffset={8}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="max-h-[400px] overflow-y-auto">
            {isLoading && searchResults.length === 0 ? (
              <div className="p-6 text-center text-sm text-muted-foreground">
                <LoaderCircle className="h-6 w-6 animate-spin mx-auto mb-2 text-primary" />
                <p className="font-medium">Đang tìm kiếm...</p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="py-2">
                <div className="px-4 py-2 text-xs font-semibold text-muted-foreground border-b bg-muted/30">
                  Kết quả tìm kiếm ({searchResults.length})
                </div>
                <div className="divide-y divide-border/50">
                  {searchResults.map((result, index) => (
                    <button
                      key={result._id}
                      onClick={() => handleResultClick(result._id || "")}
                      className={cn(
                        "w-full px-4 py-3 text-left hover:bg-muted/50 transition-all duration-200 flex items-start gap-3 group",
                        selectedIndex === index && "bg-muted/70"
                      )}
                      type="button"
                    >
                      <FileIcon className="h-4 w-4 mt-0.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
                          {result.title || "Không có tiêu đề"}
                        </div>
                        {result.description && (
                          <div className="text-xs text-muted-foreground line-clamp-2 mt-1">
                            {result.description}
                          </div>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          {result.field && (
                            <Badge variant="secondary" className="text-xs">
                              {result.field}
                            </Badge>
                          )}
                          {result.file_type && (
                            <Badge variant="outline" className="text-xs">
                              {result.file_type}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                {searchResults.length > 5 && (
                  <button
                    onClick={() => handleSearch(searchQuery)}
                    className="w-full px-4 py-3 text-center text-sm text-primary hover:bg-muted/50 transition-colors border-t font-semibold"
                    type="button"
                  >
                    Xem tất cả kết quả cho "{searchQuery}"
                  </button>
                )}
              </div>
            ) : debouncedQuery.trim() && !isLoading ? (
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 mb-4">
                  <SearchIcon className="h-8 w-8 text-muted-foreground/50" />
                </div>
                <p className="text-sm font-semibold text-foreground">
                  Không tìm thấy kết quả
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Thử tìm kiếm với từ khóa khác
                </p>
              </div>
            ) : null}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default HeaderContentSearch;
