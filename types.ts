
export type LevelCategory = 'primary' | 'middle' | 'secondary';

export interface Grade {
  id: string;
  name: string;
  category: LevelCategory;
  icon: string;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradeIds: string[];
}

export interface Lesson {
  id: string;
  subjectId: string;
  gradeId: string;
  title: string;
  unit: string;
  content: string;
  videoUrl?: string;
  pdfUrl?: string;
}

export interface Exam {
  id: string;
  subjectId: string;
  gradeId: string;
  title: string;
  year: number;
  semester?: 1 | 2; // الدورة الأولى أو الثانية
  term?: number; // رقم الفرض (1، 2، 3)
  model?: number; // رقم النموذج
  type: 'local' | 'national' | 'regional' | 'assignment'; // 'assignment' للفروض المحروسة
  session?: 'ordinary' | 'remedial';
  stream?: string;
  fileUrl: string;
  hasCorrection: boolean;
}
