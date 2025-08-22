'use client';

import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FileWithPreview extends File {
  preview?: string;
  progress?: number;
  status?: 'pending' | 'uploading' | 'success' | 'error';
}

interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  maxFiles?: number;
  onUpload: (files: File[]) => Promise<void>;
  className?: string;
}

export function FileUpload({
  accept,
  multiple = false,
  maxSize = 10,
  maxFiles = 5,
  onUpload,
  className,
}: FileUploadProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFiles = (fileList: FileList | File[]): File[] => {
    const validFiles: File[] = [];
    const filesArray = Array.from(fileList);

    // Check max files
    if (filesArray.length > maxFiles) {
      setError(`最大${maxFiles}個のファイルまでアップロード可能です`);
      return [];
    }

    // Validate each file
    for (const file of filesArray) {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        setError(`ファイルサイズは${maxSize}MB以下にしてください`);
        continue;
      }

      // Check file type if accept is specified
      if (accept) {
        const acceptedTypes = accept.split(',').map(t => t.trim());
        const fileType = file.type || '';
        const fileExtension = `.${file.name.split('.').pop()}`;
        
        const isAccepted = acceptedTypes.some(type => {
          if (type.startsWith('.')) {
            return fileExtension.toLowerCase() === type.toLowerCase();
          }
          if (type.endsWith('/*')) {
            return fileType.startsWith(type.replace('/*', ''));
          }
          return fileType === type;
        });

        if (!isAccepted) {
          setError(`許可されていないファイル形式です`);
          continue;
        }
      }

      validFiles.push(file);
    }

    return validFiles;
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);

    const validFiles = validateFiles(e.dataTransfer.files);
    if (validFiles.length > 0) {
      processFiles(validFiles);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files) {
      const validFiles = validateFiles(e.target.files);
      if (validFiles.length > 0) {
        processFiles(validFiles);
      }
    }
  };

  const processFiles = async (newFiles: File[]) => {
    const filesWithPreview = newFiles.map(file => {
      const fileWithPreview = file as FileWithPreview;
      fileWithPreview.status = 'pending';
      fileWithPreview.progress = 0;

      // Create preview for images
      if (file.type.startsWith('image/')) {
        fileWithPreview.preview = URL.createObjectURL(file);
      }

      return fileWithPreview;
    });

    setFiles(prev => multiple ? [...prev, ...filesWithPreview] : filesWithPreview);

    // Simulate upload progress
    for (const file of filesWithPreview) {
      file.status = 'uploading';
      setFiles([...filesWithPreview]);

      try {
        // Simulate progress
        for (let i = 0; i <= 100; i += 10) {
          file.progress = i;
          setFiles([...filesWithPreview]);
          await new Promise(resolve => setTimeout(resolve, 100));
        }

        await onUpload([file]);
        file.status = 'success';
      } catch (error) {
        file.status = 'error';
      }
      
      setFiles([...filesWithPreview]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          'relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all',
          isDragging
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-gray-400 bg-white'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="space-y-2">
          <div className="flex justify-center">
            <svg
              className={cn(
                'w-12 h-12',
                isDragging ? 'text-primary-600' : 'text-gray-400'
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <div>
            <p className="text-gray-700">
              ファイルをドラッグ&ドロップ
            </p>
            <p className="text-sm text-gray-500">
              または<span className="text-primary-600 font-medium">クリックして選択</span>
            </p>
          </div>
          <p className="text-xs text-gray-400">
            {accept && `対応形式: ${accept}`}
            {maxSize && ` (最大${maxSize}MB)`}
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm"
        >
          {error}
        </motion.div>
      )}

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            {files.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white border border-gray-200 rounded-lg p-3"
              >
                <div className="flex items-center space-x-3">
                  {/* File Preview */}
                  {file.preview ? (
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                  )}

                  {/* File Info */}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="flex items-center space-x-2">
                    {file.status === 'uploading' && (
                      <div className="w-24">
                        <div className="bg-gray-200 rounded-full h-2">
                          <motion.div
                            className="bg-primary-600 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${file.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {file.status === 'success' && (
                      <svg
                        className="w-5 h-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}

                    {file.status === 'error' && (
                      <svg
                        className="w-5 h-5 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(index);
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}