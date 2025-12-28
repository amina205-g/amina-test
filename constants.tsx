
import React from 'react';
import { LevelCategory, Subject } from './types';

export const LEVELS: { id: LevelCategory; name: string; description: string; color: string; icon: string }[] = [
  { id: 'primary', name: 'التعليم الابتدائي', description: 'من السنة الأولى إلى السادسة ابتدائي', color: 'bg-green-500', icon: '👶' },
  { id: 'middle', name: 'التعليم الإعدادي', description: 'من الأولى إعدادي إلى الثالثة إعدادي', color: 'bg-blue-500', icon: '🎒' },
  { id: 'secondary', name: 'التعليم الثانوي', description: 'الجذع المشترك، الأولى والثانية باكالوريا', color: 'bg-indigo-600', icon: '🎓' },
];

export const SUBJECTS: Subject[] = [
  { id: 'math_fr', name: 'الرياضيات - Mathématiques', icon: '📐', color: 'text-blue-700', gradeIds: [] },
  { id: 'physics_fr', name: 'الفيزياء والكيمياء - Physique Chimie', icon: '🧪', color: 'text-purple-600', gradeIds: [] },
  { id: 'svt_fr', name: 'علوم الحياة والأرض - SVT', icon: '🌱', color: 'text-green-600', gradeIds: [] },
  { id: 'arabic', name: 'اللغة العربية', icon: '📖', color: 'text-red-600', gradeIds: [] },
  { id: 'french', name: 'اللغة الفرنسية', icon: '🇫🇷', color: 'text-blue-800', gradeIds: [] },
  { id: 'english', name: 'اللغة الإنجليزية', icon: '🇬🇧', color: 'text-indigo-800', gradeIds: [] },
  { id: 'philosophy', name: 'الفلسفة', icon: '🧠', color: 'text-yellow-700', gradeIds: [] },
  { id: 'history_geo', name: 'التاريخ والجغرافيا', icon: '🌍', color: 'text-orange-600', gradeIds: [] },
  { id: 'islamic', name: 'التربية الإسلامية', icon: '🕌', color: 'text-emerald-700', gradeIds: [] },
  { id: 'informatique', name: 'الإعلاميات - Informatique', icon: '💻', color: 'text-gray-700', gradeIds: [] }
];

export const MOCK_LESSONS = [
  { id: 'l1', unit: 'الجبر', title: 'الأعداد العقدية - Nombres Complexes', content: 'تقديم شامل للأعداد العقدية والعمليات الجبرية...' },
  { id: 'l2', unit: 'الموجات', title: 'الموجات الميكانيكية المتوالية', content: 'دراسة انتشار الموجات الميكانيكية في وسط مرن...' },
];

export const MOCK_EXAMS = [
  { id: 'e1', title: 'الامتحان الوطني الموحد 2024', year: 2024, type: 'national', fileUrl: '#' },
  { id: 'e2', title: 'الامتحان الجهوي الموحد 2023', year: 2023, type: 'regional', fileUrl: '#' },
];
