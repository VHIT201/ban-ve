"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BookOpen, Play } from "lucide-react";

const CollaboratorGuide = () => {
  // States
  const [open, setOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Hooks
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Methods
  const handlePlay = () => {
    videoRef.current?.play();
    setIsPlaying(true);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (open) {
          setOpen(true);
        } else {
          setOpen(false);
          setIsPlaying(false);
          videoRef.current = null;
        }
      }}
    >
      <DialogTrigger asChild>
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            className="relative overflow-hidden  text-slate-900 font-medium hover:bg-success/80 transition-colors duration-300"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Hướng dẫn sử dụng
            {/* Animated notification dot */}
          </Button>
          <motion.span
            className="absolute top-0 right-0 w-2 h-2 bg-success rounded-full after:absolute after:inset-0 after:bg-success after:rounded-full after:opacity-75 after:animate-ping"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </DialogTrigger>

      <AnimatePresence>
        {open && (
          <DialogContent className="max-w-2xl border-slate-200 bg-white p-0 overflow-hidden">
            {/* Header with gradient background */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="border-slate-200 border-b px-6 py-6"
            >
              <DialogTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                Hướng dẫn sử dụng
              </DialogTitle>
              <DialogDescription className="text-slate-600 mt-2">
                Tìm hiểu cách sử dụng hệ thống với hướng dẫn chi tiết từng bước
              </DialogDescription>
            </motion.div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Video Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="relative group rounded-xl overflow-hidden bg-black aspect-video shadow-lg">
                  {/* Video */}
                  <video
                    ref={videoRef}
                    src="https://www.pexels.com/vi-vn/download/video/36244111/"
                    controls={isPlaying}
                    className="w-full h-full object-cover"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />

                  {/* Overlay */}
                  {!isPlaying && (
                    <div
                      className="absolute inset-0 flex items-center justify-center 
                bg-black/30 group-hover:bg-black/40 transition cursor-pointer rounded-xl"
                      onClick={handlePlay}
                    >
                      {/* Play Button */}
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.1 }}
                        className="
                            w-20 h-20 
                            rounded-full 
                            bg-gradient-to-b from-white/80 via-primary/50 to-primary/30
                            ring-8 ring-white/30 
                            backdrop-blur
                            flex items-center justify-center
                            shadow-xl
                            "
                      >
                        <Play
                          className="w-8 h-8 text-white"
                          fill="currentColor"
                        />
                      </motion.div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="pt-4"
              >
                <Button
                  variant="success"
                  onClick={() => setOpen(false)}
                  className="hover:bg-success/80 transition-colors duration-300 w-full text-white font-medium"
                >
                  Đã hiểu, cảm ơn
                </Button>
              </motion.div>
            </div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
};

export default CollaboratorGuide;
