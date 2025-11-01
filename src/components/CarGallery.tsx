"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PlayCircle, X } from 'lucide-react';

interface CarGalleryProps {
  images: string[];
  videos?: string[];
}

export const CarGallery = ({ images, videos }: CarGalleryProps) => {
  const [selectedMedia, setSelectedMedia] = useState<string>(images[0] || videos?.[0] || '');
  const [isMainMediaVideo, setIsMainMediaVideo] = useState<boolean>(!!videos?.[0] && selectedMedia === videos[0]);

  useEffect(() => {
    if (images.length > 0) {
      setSelectedMedia(images[0]);
      setIsMainMediaVideo(false);
    } else if (videos && videos.length > 0) {
      setSelectedMedia(videos[0]);
      setIsMainMediaVideo(true);
    }
  }, [images, videos]);

  const handleMediaClick = (mediaUrl: string, isVideo: boolean) => {
    setSelectedMedia(mediaUrl);
    setIsMainMediaVideo(isVideo);
  };

  const allMedia = [...images, ...(videos || [])];

  return (
    <div className="grid gap-4">
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative aspect-video overflow-hidden rounded-lg cursor-pointer group">
            {isMainMediaVideo ? (
              <video
                src={selectedMedia}
                controls
                className="w-full h-full object-cover"
                aria-label="Selected video"
              />
            ) : (
              <img
                src={selectedMedia}
                alt="Selected car image"
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
              <PlayCircle className="h-16 w-16 text-white" />
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-4xl p-0 border-none bg-transparent">
          <div className="relative aspect-video">
            {isMainMediaVideo ? (
              <video
                src={selectedMedia}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={selectedMedia}
                alt="Selected car image in dialog"
                className="w-full h-full object-contain"
              />
            )}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-white hover:bg-white hover:text-black"
              onClick={() => { /* Close dialog logic, if needed */ }}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-4 gap-4">
        {allMedia.map((media, index) => (
          <div
            key={index}
            className={cn(
              "relative aspect-video overflow-hidden rounded-lg cursor-pointer border-2",
              selectedMedia === media ? "border-primary" : "border-transparent"
            )}
            onClick={() => handleMediaClick(media, (videos || []).includes(media))}
          >
            {(videos || []).includes(media) ? (
              <video
                src={media}
                className="w-full h-full object-cover"
                aria-label={`Thumbnail video ${index + 1}`}
              />
            ) : (
              <img
                src={media}
                alt={`Thumbnail image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            )}
            {(videos || []).includes(media) && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
                <PlayCircle className="h-8 w-8" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};