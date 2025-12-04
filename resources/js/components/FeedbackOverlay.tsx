import ReactDOM from 'react-dom';
import CorrectIcon from './icons/CorrectIcon';
import IncorrectIcon from './icons/IncorrectIcon';

interface FeedbackOverlayProps {
  show: boolean;
  isCorrect: boolean;
}

export default function FeedbackOverlay({ show, isCorrect }: FeedbackOverlayProps) {
  if (!show) {
    return null;
  }

  const sizeStyle = {
    width: '85vmin',
    height: '85vmin',
    maxWidth: '800px',
    maxHeight: '800px'
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div style={sizeStyle} className="animate-pop-in">
        {isCorrect ? (
          <CorrectIcon className="w-full h-full" />
        ) : (
          <IncorrectIcon className="w-full h-full" />
        )}
      </div>
    </div>,
    document.body
  );
}
