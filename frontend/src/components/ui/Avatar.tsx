import { createAvatar } from "@dicebear/core";
import { funEmoji } from "@dicebear/collection";

interface AvatarProps {
  seed: string;        // username, email
  size?: number;       // optional size override
  className?: string;  // extra CSS if needed
}

export default function Avatar({ seed, size = 80, className }: AvatarProps) {
  const svg = createAvatar(funEmoji, {
    seed,
    size,
    radius: 10,
    backgroundType: ["solid"],
    backgroundColor: ["b6e3f4","c0aede","d1d4f9","ffd5dc"],
    eyes:["closed","closed2","crying","sleepClose","wink","wink2"],
    mouth:["cute","lilSmile","wideSmile"],
    scale: 90
  }).toString();

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
