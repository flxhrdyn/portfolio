'use client';

import React from 'react';
import { useDesign } from '@/context/DesignContext';
import { D1Ledger } from '@/components/designs/d1-ledger/D1Ledger';
import { D2Architectural } from '@/components/designs/d2-architectural/D2Architectural';
import { D3Proof } from '@/components/designs/d3-proof/D3Proof';
import { D4Inline } from '@/components/designs/d4-inline/D4Inline';
import { D1Synthesis } from '@/components/designs/d1-synthesis/D1Synthesis';

export function ActiveDesignRenderer() {
  const { design } = useDesign();

  switch (design) {
    case 'd1':
      return <D1Ledger />;
    case 'd2':
      return <D2Architectural />;
    case 'd3':
      return <D3Proof />;
    case 'd4':
      return <D4Inline />;
    case 'd5':
      return <D1Synthesis />;
    default:
      return <D1Ledger />;
  }
}

export default ActiveDesignRenderer;
