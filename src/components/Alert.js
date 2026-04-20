import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useAlertContext } from '../context/alertContext';

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
    closeRef.current?.focus();
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
        role='alertdialog'
        aria-modal='true'
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-desc'
        className={`relative z-10 w-full max-w-md rounded-2xl border border-white/10 shadow-2xl ${
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
          <button
            ref={closeRef}
            type='button'
            onClick={onClose}
            className={`rounded-full px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900/40 ${
              isSuccess ? 'bg-emerald-800' : 'bg-orange-900'
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(panel, document.body);
}

export default Alert;
