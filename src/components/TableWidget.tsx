
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Table, TableRow, TableCell, TableHead, TableHeader, TableBody } from '@/components/ui/table';
import { Maximize, Minimize, Table as TableIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface Column<T> {
  id: string;
  header: string;
  accessor: (row: T) => React.ReactNode;
  className?: string;
}

export interface TableWidgetProps<T> {
  title: string;
  icon?: React.ReactNode;
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
  className?: string;
  initialHeight?: number;
}

export const TableWidget = <T extends object>({
  title,
  icon = <TableIcon className="h-5 w-5" />,
  columns,
  data,
  pageSize = 10,
  className,
  initialHeight = 400,
}: TableWidgetProps<T>) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [height, setHeight] = useState(initialHeight);
  const containerRef = useRef<HTMLDivElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(0);

  const totalPages = Math.ceil(data.length / pageSize);
  
  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      
      const deltaY = e.clientY - startY;
      const newHeight = Math.max(200, startHeight + deltaY);
      
      if (containerRef.current) {
        setHeight(newHeight);
      }
    };
    
    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = 'default';
    };
    
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, startHeight, startY]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    setStartY(e.clientY);
    setStartHeight(height);
    document.body.style.cursor = 'row-resize';
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        'bg-white rounded-lg shadow-md border border-gray-200',
        isFullScreen ? 'fixed inset-0 z-50 flex flex-col animate-fade-in' : 'relative',
        className
      )}
      style={{ height: isFullScreen ? '100%' : height }}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          {icon}
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={toggleFullScreen} className="hover:bg-gray-100 rounded-full">
          {isFullScreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
        </Button>
      </div>
      
      <div className="overflow-auto flex-grow">
        <Table>
          <TableHeader>
            <TableRow className="bg-table-header">
              {columns.map((column) => (
                <TableHead 
                  key={column.id}
                  className={cn("font-medium text-gray-700", column.className)}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <TableRow 
                  key={rowIndex}
                  className="hover:bg-table-hover transition-colors"
                >
                  {columns.map((column) => (
                    <TableCell 
                      key={`${rowIndex}-${column.id}`}
                      className={column.className}
                    >
                      {column.accessor(row)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-between items-center px-4 py-2 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
      
      {!isFullScreen && (
        <div 
          ref={resizerRef}
          className="h-2 bg-transparent hover:bg-gray-200 cursor-row-resize w-full absolute bottom-0"
          onMouseDown={handleMouseDown}
        />
      )}
    </div>
  );
};
