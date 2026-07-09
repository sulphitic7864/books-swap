import { useEffect, useState } from "react";

export function usePageReady(delay = 320) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return ready;
}

export function CatalogSkeleton() {
  return <><div className="skeleton filtersSkeleton" /><div className="books">{Array.from({ length: 6 }).map((_, i) => <div className="book card skeletonCard" key={i}><span /><div><i /><i /><i /></div></div>)}</div></>;
}

export function DashboardSkeleton() {
  return <><div className="grid four">{Array.from({ length: 4 }).map((_, i) => <div className="metric card skeletonMetric" key={i}><span /><b /></div>)}</div><div className="books skeletonGap">{Array.from({ length: 3 }).map((_, i) => <div className="book card skeletonCard" key={i}><span /><div><i /><i /><i /></div></div>)}</div></>;
}

export function RequestsSkeleton() {
  return <div className="requestList">{Array.from({ length: 4 }).map((_, i) => <article className="request card skeletonRequest" key={i}><div><i /><i /><i /></div><span /></article>)}</div>;
}

export function CommunitySkeleton() {
  return <div>{Array.from({ length: 5 }).map((_, i) => <article className="activity card skeletonActivity" key={i}><i /><small /></article>)}</div>;
}
