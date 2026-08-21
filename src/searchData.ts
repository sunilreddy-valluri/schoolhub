import { dashboardData } from '../data/dashboardData';
import { teachersData } from '../data/teachersData';
import { classesData } from '../data/classData';
import { assignmentsData } from '../data/assignmentData';
import { announcementsData } from '../data/announcementsData';

export type SearchCategory = 'students' | 'teachers' | 'classes' | 'assignments' | 'announcements';

export interface SearchResultItem {
    id: string;
    title: string;
    subtitle?: string;
    category: SearchCategory;
    categoryLabel: string;
    path: string;
}

export const searchAll = (query: string): Record<SearchCategory, SearchResultItem[]> => {
    const q = query.trim().toLowerCase();

    const results: Record<SearchCategory, SearchResultItem[]> = {
        students: [],
        teachers: [],
        classes: [],
        assignments: [],
        announcements: []
    };

    if (!q) return results;

    // 1. Students
    const students = dashboardData?.students || [];
    students.forEach((student: any) => {
        const fullName = `${student.name || ''} ${student.grade || ''}`.toLowerCase();
        if (fullName.includes(q) || (student.id && student.id.toLowerCase().includes(q))) {
            results.students.push({
                id: student.id,
                title: student.name,
                subtitle: student.grade ? `Grade: ${student.grade}` : undefined,
                category: 'students',
                categoryLabel: 'Students',
                path: `/students/${student.id}`
            });
        }
    });

    // 2. Teachers
    const teachers = Array.isArray(teachersData) ? teachersData : (teachersData as any)?.teachers || [];
    teachers.forEach((teacher: any) => {
        const searchTarget = `${teacher.name || ''} ${teacher.subject || ''} ${teacher.email || ''}`.toLowerCase();
        if (searchTarget.includes(q)) {
            results.teachers.push({
                id: teacher.id,
                title: teacher.name,
                subtitle: teacher.subject || teacher.role,
                category: 'teachers',
                categoryLabel: 'Teachers',
                path: `/teachers/${teacher.id}`
            });
        }
    });

    // 3. Classes
    const classes = Array.isArray(classesData) ? classesData : (classesData as any)?.classes || [];
    classes.forEach((cls: any) => {
        const searchTarget = `${cls.name || cls.title || ''} ${cls.room || ''} ${cls.teacher || ''}`.toLowerCase();
        if (searchTarget.includes(q)) {
            results.classes.push({
                id: cls.id,
                title: cls.name || cls.title,
                subtitle: cls.teacher ? `Teacher: ${cls.teacher}` : cls.room ? `Room ${cls.room}` : undefined,
                category: 'classes',
                categoryLabel: 'Classes',
                path: `/classes/${cls.id}`
            });
        }
    });

    // 4. Assignments
    const assignments = Array.isArray(assignmentsData) ? assignmentsData : (assignmentsData as any)?.assignments || [];
    assignments.forEach((assignment: any) => {
        const searchTarget = `${assignment.title || ''} ${assignment.subject || assignment.course || ''}`.toLowerCase();
        if (searchTarget.includes(q)) {
            results.assignments.push({
                id: assignment.id,
                title: assignment.title,
                subtitle: assignment.subject || assignment.course || assignment.dueDate,
                category: 'assignments',
                categoryLabel: 'Assignments',
                path: `/assignments`
            });
        }
    });

    // 5. Announcements
    const announcements = Array.isArray(announcementsData) ? announcementsData : (announcementsData as any)?.announcements || [];
    announcements.forEach((ann: any) => {
        const searchTarget = `${ann.title || ''} ${ann.content || ''} ${ann.category || ''}`.toLowerCase();
        if (searchTarget.includes(q)) {
            results.announcements.push({
                id: ann.id,
                title: ann.title,
                subtitle: ann.date || ann.category,
                category: 'announcements',
                categoryLabel: 'Announcements',
                path: `/announcements`
            });
        }
    });

    return results;
};
