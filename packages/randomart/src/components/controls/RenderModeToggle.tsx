import { Button } from '@repo/ui/Button';
import { setRenderMode } from '../../stores/randomart/actions/display';
import { useRenderMode } from '../../stores/randomart/selectors';

export function RenderModeToggle() {
  const renderMode = useRenderMode();

  return (
    <Button
      type="button"
      onClick={() => setRenderMode(renderMode === 'glsl' ? 'canvas' : 'glsl')}
      variant="outline"
      className="w-fit"
      title={
        renderMode === 'glsl'
          ? 'Switch to CPU (Canvas 2D)'
          : 'Switch to GPU (WebGL)'
      }
    >
      {renderMode === 'glsl' ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <rect
            x="4"
            y="4"
            width="16"
            height="16"
            rx="2"
          />
          <path d="M9 9h.01" />
          <path d="M15 9h.01" />
          <path d="M9 15h6" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2"
          />
          <circle
            cx="8.5"
            cy="8.5"
            r="1.5"
          />
          <path d="M20 13l-4-4-4 4-3-2-5 5" />
        </svg>
      )}
      <span className="text-xs">{renderMode === 'glsl' ? 'GPU' : 'CPU'}</span>
    </Button>
  );
}
