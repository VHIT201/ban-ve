// Core
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import debounce from "lodash-es/debounce";
import { motion, AnimatePresence } from "framer-motion";

import {
  SearchIcon,
  FileIcon,
  TrendingUpIcon,
  XIcon,
  LoaderCircle,
  MicIcon,
  MicOffIcon,
  ArrowLeftIcon,
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
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { GetApiSearch200 } from "@/api/models";
import { cn } from "@/utils/ui";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

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

function HeaderContentSearch() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  // States
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isListening, setIsListening] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<any>(null);

  // Check for speech recognition support on mount
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSpeechSupported(!!SpeechRecognition);
  }, []);

  // Debounced search handler
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedQuery(value);
      }, 500),
    [],
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
    },
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

  const initSpeechRecognition = useCallback(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSpeechSupported(false);
      return null;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "vi-VN";
      return recognition;
    } catch (error) {
      console.error("Khởi tạo nhận dạng giọng nói thất bại:", error);
      return null;
    }
  }, []);

  const toggleSpeechRecognition = useCallback(async () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      setIsProcessing(false);
      return;
    }

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (error) {
      console.error("Microphone access denied:", error);
      return;
    }

    const recognition = initSpeechRecognition();
    if (!recognition) return;

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0]?.transcript || "")
        .join("")
        .trim();

      if (transcript) {
        setSearchQuery(transcript);
        debouncedSearch(transcript);
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      setIsProcessing(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      setIsProcessing(false);
    };

    recognitionRef.current = recognition;
    try {
      setSearchQuery("");
      setDebouncedQuery("");
      debouncedSearch.cancel();

      recognition.start();
      setIsListening(true);
      setIsProcessing(true);

      setTimeout(() => {
        if (isListening) {
          recognition.stop();
          setIsListening(false);
          setIsProcessing(false);
        }
      }, 10000);
    } catch (error) {
      console.error("Failed to start speech recognition:", error);
      setIsListening(false);
      setIsProcessing(false);
    }
  }, [isListening]);

  // Methods
  const handleSearch = useCallback(
    (query: string) => {
      if (query.trim()) {
        router.push(`/collections?search=${encodeURIComponent(query)}`);
        setIsOpen(false);
        setIsMobileSearchOpen(false);
        setSearchQuery("");
        setDebouncedQuery("");
        inputRef.current?.blur();
        mobileInputRef.current?.blur();
      }
    },
    [router],
  );

  const handleResultClick = useCallback(
    (contentId: string) => {
      router.push(`/detail/${contentId}`);
      setIsOpen(false);
      setIsMobileSearchOpen(false);
      setSearchQuery("");
      setDebouncedQuery("");
      inputRef.current?.blur();
      mobileInputRef.current?.blur();
    },
    [router],
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
            prev < searchResults.length - 1 ? prev + 1 : prev,
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
    ],
  );

  useEffect(() => {
    if (debouncedQuery.trim().length > 0) {
      setIsOpen(true);
      setSelectedIndex(-1);
    } else {
      setIsOpen(false);
    }
  }, [debouncedQuery]);

  // Auto focus mobile input when opened
  useEffect(() => {
    if (isMobileSearchOpen && mobileInputRef.current) {
      setTimeout(() => {
        mobileInputRef.current?.focus();
      }, 100);
    }
  }, [isMobileSearchOpen]);

  // Render search input UI
  const renderSearchInput = (
    ref: React.RefObject<HTMLInputElement | null>,
    isMobileView = false,
  ) => (
    <div className="relative group">
      {/* Search Icon */}
      <SearchIcon
        className={cn(
          "absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 z-10 pointer-events-none",
          isMobileView ? "h-5 w-5" : "h-4 w-4",
          isOpen || isMobileSearchOpen
            ? "text-primary"
            : "text-muted-foreground group-focus-within:text-primary",
        )}
      />

      {/* Input */}
      <Input
        ref={ref}
        type="text"
        placeholder="Tìm kiếm bản vẽ"
        className={cn(
          "shadow-none border-border/40 bg-background/50",
          "focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary/40",
          "placeholder:text-muted-foreground/60 transition-all duration-200",
          "hover:border-border/60 hover:bg-background/80",
          isMobileView
            ? "pl-12 pr-20 h-14 text-base rounded-none"
            : "pl-10 pr-20 h-10 rounded-none",
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
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={handleClear}
            className="hover:bg-muted rounded-full p-1.5 transition-colors"
            type="button"
          >
            <XIcon
              className={cn(
                "text-muted-foreground hover:text-foreground",
                isMobileView ? "h-5 w-5" : "h-3.5 w-3.5",
              )}
            />
          </motion.button>
        )}

        {isSpeechSupported && (
          <button
            type="button"
            onClick={toggleSpeechRecognition}
            className={cn(
              "rounded-full transition-all duration-300 relative",
              isMobileView ? "p-2" : "p-1.5",
              isListening
                ? "text-white bg-red-500 shadow-lg shadow-red-500/30"
                : "text-muted-foreground hover:text-foreground hover:bg-muted",
              isListening && "ring-2 ring-offset-2 ring-red-500",
            )}
            disabled={isLoading}
            title={isListening ? "Đang nghe..." : "Nhấn để nói"}
          >
            <div className="relative">
              {isListening ? (
                <div className="relative">
                  <div className="absolute -inset-1.5 bg-red-500/20 rounded-full animate-ping"></div>
                  <MicOffIcon
                    className={cn(
                      isMobileView ? "h-5 w-5" : "h-4 w-4",
                      "relative",
                    )}
                  />
                </div>
              ) : (
                <MicIcon className={cn(isMobileView ? "h-5 w-5" : "h-4 w-4")} />
              )}
            </div>
          </button>
        )}

        {isLoading && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={cn(isMobileView ? "p-2" : "p-1.5")}
          >
            <LoaderCircle
              className={cn(
                "animate-spin text-primary",
                isMobileView ? "h-5 w-5" : "h-4 w-4",
              )}
            />
          </motion.div>
        )}
      </div>
    </div>
  );

  // Render search results
  const renderSearchResults = () => (
    <div
      className={cn(
        "bg-background overflow-y-auto",
        isMobile
          ? "h-full"
          : "rounded-lg min-h-[200px] max-h-[60vh] shadow-md border border-border/50",
      )}
    >
      {isLoading && searchResults.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 text-center text-sm text-muted-foreground"
        >
          <LoaderCircle className="h-8 w-8 animate-spin mx-auto mb-3 text-primary" />
          <p className="font-medium">Đang tìm kiếm...</p>
        </motion.div>
      ) : searchResults.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-2"
        >
          <div className="px-4 py-2 text-xs font-semibold text-muted-foreground border-b bg-muted/30">
            Kết quả tìm kiếm ({searchResults.length})
          </div>
          <div className="divide-y divide-border/50">
            {searchResults.map((result, index) => (
              <motion.button
                key={result._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleResultClick(result._id || "")}
                className={cn(
                  "w-full px-4 py-3 text-left hover:bg-muted/50 transition-all duration-200 flex items-start gap-3 group",
                  selectedIndex === index && "bg-muted/70",
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
              </motion.button>
            ))}
          </div>
          {searchResults.length > 5 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => handleSearch(searchQuery)}
              className="w-full px-4 py-3 text-center text-sm text-primary hover:bg-muted/50 transition-colors border-t font-semibold"
              type="button"
            >
              Xem tất cả kết quả cho "{searchQuery}"
            </motion.button>
          )}
        </motion.div>
      ) : debouncedQuery.trim() && !isLoading ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn("text-center", isMobile ? "py-12 px-6" : "p-8")}
        >
          <div
            className={cn(
              "inline-flex items-center justify-center rounded-full bg-muted/50 mb-4",
              isMobile ? "w-20 h-20" : "w-16 h-16",
            )}
          >
            <SearchIcon
              className={cn(
                "text-muted-foreground/50",
                isMobile ? "h-10 w-10" : "h-8 w-8",
              )}
            />
          </div>
          <p className="text-sm font-semibold text-foreground mb-1">
            Không tìm thấy kết quả
          </p>
          <p className="text-xs text-muted-foreground">
            Thử tìm kiếm với từ khóa khác
          </p>
        </motion.div>
      ) : null}
    </div>
  );

  // Template
  return (
    <div className={cn(isMobile ? "" : "flex-1 max-w-xl mx-0 md:mx-6 w-full")}>
      {/* Desktop Search - Popover */}
      {!isMobile ? (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>{renderSearchInput(inputRef)}</PopoverTrigger>

          <PopoverContent
            className={cn("w-(--radix-popover-trigger-width) p-0 rounded-2xl")}
            align="start"
            sideOffset={8}
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            {renderSearchResults()}
          </PopoverContent>
        </Popover>
      ) : (
        /* Mobile Search - Full Screen Dialog */
        <>
          {/* Mobile Search Trigger */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setIsMobileSearchOpen(true)}
          >
            <SearchIcon className="size-5" />
          </Button>

          {/* Mobile Full Screen Search Dialog */}
          <AnimatePresence>
            {isMobileSearchOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-100 bg-background"
              >
                {/* Header */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="sticky top-0 z-10 bg-background/95 backdrop-blur-xl border-b border-border/40 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setIsMobileSearchOpen(false);
                        setSearchQuery("");
                        setDebouncedQuery("");
                      }}
                      className="p-2 hover:bg-muted rounded-full transition-colors"
                      type="button"
                    >
                      <ArrowLeftIcon className="h-5 w-5" />
                    </motion.button>
                    <div className="flex-1">
                      {renderSearchInput(mobileInputRef, true)}
                    </div>
                  </div>
                </motion.div>

                {/* Search Results */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="overflow-y-auto h-[calc(100vh-80px)]"
                >
                  {debouncedQuery.trim() ? (
                    renderSearchResults()
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="p-6 bg-background h-dvh"
                    >
                      <div className="text-center py-12">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 mb-4">
                          <SearchIcon className="h-10 w-10 text-muted-foreground/50" />
                        </div>
                        <p className="text-sm font-semibold text-foreground mb-2">
                          Bắt đầu tìm kiếm
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Nhập từ khóa hoặc sử dụng micro để tìm kiếm
                        </p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

export default HeaderContentSearch;
