function LoadingFallback() {
  return (
    <div className="flex h-full items-center justify-center text-muted-foreground">
      Computing graph layout...
    </div>
  );
}

export { LoadingFallback };
