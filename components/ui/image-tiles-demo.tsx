import React from 'react';

import ImageReveal from '@/components/ui/image-tiles';

export default function DemoOne() {
  return (
    <div>
      <ImageReveal
        leftImage="https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80"
        middleImage="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80"
        rightImage="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80"
      />
    </div>
  );
}
