import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useAlertContext } from '../context/alertContext';
import Button from './Button';

function Alert() {
  const { isOpen, type, message, onClose } = useAlertContext();
  const closeRef = useRef(null);
  const isSuccess = type === 'success';

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // Focus the dialog panel; Button may not forward refs
    closeRef.current?.focus?.();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const panel = (
    <div
      className='fixed inset-0 z-[10050] flex items-center justify-center p-4'
      role='presentation'
    >
      <button
        type='button'
        className='absolute inset-0 bg-black/60 backdrop-blur-[2px]'
        aria-label='Close dialog'
        onClick={onClose}
      />
      <div
        ref={closeRef}
        tabIndex={-1}
        role='alertdialog'
        aria-modal='true'
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-desc'
        className={`relative z-10 w-full max-w-md rounded-2xl border-2 border-black shadow-brutal ${
          isSuccess ? 'bg-[#81C784]' : 'bg-[#FF8A65]'
        } px-6 py-5 text-gray-900`}
      >
        <h2 id='alert-dialog-title' className='text-lg font-bold'>
          {isSuccess ? 'All good!' : 'Oops!'}
        </h2>
        <p id='alert-dialog-desc' className='mt-2 text-sm leading-relaxed opacity-95'>
          {message}
        </p>
        <div className='mt-6 flex justify-end'>
          <Button type='button' onClick={onClose} size='sm'>
            Close
          </Button>
        </div>
      </div>
    </div>
  );

  return createPortal(panel, document.body);
}

export default Alert;
