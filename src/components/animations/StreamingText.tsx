"use client";

import { useState, useEffect } from "react";

interface StreamingTextProps {
    text: string;
    speed?: number;
    onComplete?: () => void;
}

export default function StreamingText({ text, speed = 15, onComplete }: StreamingTextProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, speed);

            return () => clearTimeout(timeout);
        } else if (onComplete) {
            onComplete();
        }
    }, [currentIndex, text, speed, onComplete]);

    return (
        <span className="whitespace-pre-wrap">
            {displayedText}
            {currentIndex < text.length && (
                <span className="inline-block w-1.5 h-4 bg-primary/40 ml-0.5 animate-pulse rounded-full align-middle" />
            )}
        </span>
    );
}
