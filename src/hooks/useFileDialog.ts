import { useEffect, useRef, useState } from 'react';

export interface IUseFileDialogProps {
  /**
   * @default false
   */
  multiple?: boolean;
  /**
   * @default '*'
   */
  accept?: string;
  /**
   * @default undefined
   */
  capture?: string;
  /**
   * @default true
   */
  reset?: boolean;
}

const DEFAULT_OPTIONS: IUseFileDialogProps = {
  multiple: false,
  accept: '*',
  reset: true,
};

export interface IUseFileDialogReturn {
  files: FileList | null;
  open: (localOptions?: Partial<IUseFileDialogProps>) => void;
  reset: () => void;
}

/**
 * Open file dialog with ease.
 *
 * @see https://vueuse.org/useFileDialog
 * @param options
 */
export const useFileDialog = (
  options: IUseFileDialogProps = {},
): IUseFileDialogReturn => {
  const [files, setFiles] = useState<FileList | null>(null);
  const input = useRef<HTMLInputElement>(document.createElement('input'));

  useEffect(() => {
    input.current.type = 'file';
    input.current.onchange = (event: Event) => {
      const result = event.target as HTMLInputElement;
      setFiles(result.files);
    };

    return () => {};
  }, []);

  const reset = () => {
    setFiles(null);
    if (input.current) {
      input.current.value = '';
    }
  };

  const open = (localOptions?: Partial<IUseFileDialogProps>) => {
    if (!input.current) {
      return;
    }

    const _options = {
      ...DEFAULT_OPTIONS,
      ...options,
      ...localOptions,
    };

    input.current.multiple = _options.multiple!;
    input.current.accept = _options.accept!;
    if (_options.capture) {
      input.current.capture = _options.capture!;
    }
    if (_options.reset) {
      reset();
    }
    input.current.click();
  };

  return {
    files,
    open,
    reset,
  };
};
