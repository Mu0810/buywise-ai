"use client";

import { ArrowUp } from "lucide-react";
import { useState, type FormEvent, type KeyboardEvent } from "react";

import { Button } from "@/components/ui/button";

export function ChatComposer({
  onSend,
  disabled,
}: {
  onSend: (text: string) => void;
  disabled?: boolean;
}) {
  const [value, setValue] = useState("");

  function submit(event?: FormEvent) {
    event?.preventDefault();
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue("");
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  }

  return (
    <form
      onSubmit={submit}
      className="relative rounded-2xl border border-border/60 bg-card p-2 shadow-sm transition-[border-color,box-shadow] duration-300 focus-within:border-brand/50 focus-within:shadow-[0_0_0_3px] focus-within:shadow-brand/10"
    >
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={onKeyDown}
        rows={1}
        placeholder="Ask about any product, or describe what you need…"
        aria-label="Message"
        className="max-h-40 w-full resize-none bg-transparent px-2 py-1.5 pr-12 text-sm outline-none"
      />
      <Button
        type="submit"
        size="icon"
        disabled={disabled || !value.trim()}
        className="absolute bottom-2 right-2"
        aria-label="Send message"
      >
        <ArrowUp className="size-4" />
      </Button>
    </form>
  );
}
