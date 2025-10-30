import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GripVertical, RotateCcw, Save, Trash2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export interface ColumnConfig {
  id: string;
  label: string;
  visible: boolean;
  order: number;
}

interface SavedView {
  id: string;
  name: string;
  columns: ColumnConfig[];
}

interface ConfigureColumnsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  columns: ColumnConfig[];
  onSave: (columns: ColumnConfig[]) => void;
  onReset: () => void;
}

export const ConfigureColumnsModal = ({
  open,
  onOpenChange,
  columns,
  onSave,
  onReset
}: ConfigureColumnsModalProps) => {
  const [localColumns, setLocalColumns] = useState<ColumnConfig[]>([...columns]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [savedViews, setSavedViews] = useState<SavedView[]>([]);
  const [newViewName, setNewViewName] = useState('');
  const [showSaveView, setShowSaveView] = useState(false);

  useEffect(() => {
    setLocalColumns([...columns]);
    
    // Load saved views from localStorage
    const saved = localStorage.getItem('reportColumnViews');
    if (saved) {
      setSavedViews(JSON.parse(saved));
    }
  }, [columns, open]);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newColumns = [...localColumns];
    const draggedItem = newColumns[draggedIndex];
    newColumns.splice(draggedIndex, 1);
    newColumns.splice(index, 0, draggedItem);
    
    // Update order values
    const updatedColumns = newColumns.map((col, idx) => ({
      ...col,
      order: idx
    }));
    
    setLocalColumns(updatedColumns);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const toggleColumnVisibility = (id: string) => {
    setLocalColumns(prev =>
      prev.map(col =>
        col.id === id ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const handleSave = () => {
    onSave(localColumns);
    onOpenChange(false);
  };

  const handleReset = () => {
    onReset();
    onOpenChange(false);
  };

  const handleSaveView = () => {
    if (!newViewName.trim()) return;

    const newView: SavedView = {
      id: Date.now().toString(),
      name: newViewName,
      columns: [...localColumns]
    };

    const updatedViews = [...savedViews, newView];
    setSavedViews(updatedViews);
    localStorage.setItem('reportColumnViews', JSON.stringify(updatedViews));
    
    setNewViewName('');
    setShowSaveView(false);
  };

  const handleLoadView = (view: SavedView) => {
    setLocalColumns([...view.columns]);
  };

  const handleDeleteView = (viewId: string) => {
    const updatedViews = savedViews.filter(v => v.id !== viewId);
    setSavedViews(updatedViews);
    localStorage.setItem('reportColumnViews', JSON.stringify(updatedViews));
  };

  const visibleCount = localColumns.filter(col => col.visible).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Configure Columns</DialogTitle>
          <DialogDescription>
            Customize which columns to display and reorder them by dragging. Save your preferred views for quick access.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Column Configuration */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {visibleCount} of {localColumns.length} columns visible
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset to Default
              </Button>
            </div>

            <ScrollArea className="h-[300px] border rounded-lg p-2">
              <div className="space-y-2">
                {localColumns.map((column, index) => (
                  <div
                    key={column.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-move hover:bg-accent transition-colors ${
                      draggedIndex === index ? 'opacity-50' : ''
                    }`}
                  >
                    <GripVertical className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    
                    <Checkbox
                      id={`col-${column.id}`}
                      checked={column.visible}
                      onCheckedChange={() => toggleColumnVisibility(column.id)}
                    />
                    
                    <Label
                      htmlFor={`col-${column.id}`}
                      className="flex-1 cursor-pointer font-medium"
                    >
                      {column.label}
                    </Label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Saved Views */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">Saved Views</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSaveView(!showSaveView)}
              >
                <Save className="w-4 h-4" />
              </Button>
            </div>

            {showSaveView && (
              <div className="space-y-2 p-3 border rounded-lg bg-accent/50">
                <Input
                  placeholder="View name..."
                  value={newViewName}
                  onChange={(e) => setNewViewName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSaveView()}
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleSaveView}
                    disabled={!newViewName.trim()}
                    className="flex-1"
                  >
                    Save View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setShowSaveView(false);
                      setNewViewName('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            <ScrollArea className="h-[240px]">
              {savedViews.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center p-4">
                  No saved views yet
                </p>
              ) : (
                <div className="space-y-2">
                  {savedViews.map((view) => (
                    <div
                      key={view.id}
                      className="flex items-center justify-between p-2 border rounded-lg hover:bg-accent transition-colors"
                    >
                      <button
                        onClick={() => handleLoadView(view)}
                        className="flex-1 text-left text-sm font-medium hover:text-primary"
                      >
                        {view.name}
                      </button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteView(view.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </div>

        <Separator />

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Apply Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
