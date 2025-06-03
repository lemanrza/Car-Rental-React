import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Input } from "../ui/input";
import type { User } from "@/types/authType";

type ReviewDialogProps = {
  onSubmit: (data: { rating: number; comment: string }) => void;
  user?: User;
};

const ReviewDialog: React.FC<ReviewDialogProps> = ({ onSubmit, user }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);

  const handleStarClick = (starValue: number) => setRating(starValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior and page reload

    if (!comment.trim() || rating === 0) {
      alert("Please write a review and select a star rating.");
      return;
    }
    onSubmit({ rating, comment });
    setRating(0);
    setHover(0);
    setComment("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Write a review</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg sm:p-8">
        <DialogHeader>
          <DialogTitle>Write a review</DialogTitle>
          <DialogDescription>
            <label className="block mb-1 font-medium">Your rating</label>
            <div className="flex items-center mb-4 gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-8 h-8 cursor-pointer ${ (hover || rating) >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-400" }`}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  aria-label={`${star} star`}
                />
              ))}
            </div>

            <label htmlFor="email" className="block mb-1 font-medium">
              Your email
            </label>
            <Input
              id="email"
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full mb-4 px-3 py-2 border rounded bg-gray-100 cursor-not-allowed"
            />

            <label htmlFor="comment" className="block mb-1 font-medium">
              Your review
            </label>
            <textarea
              id="comment"
              placeholder="Write your review here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
              className="w-full px-3 py-2 border rounded resize-none"
            />
          </DialogDescription>
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Submit Review</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
