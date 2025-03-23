import { Component } from '@angular/core';

interface GymClass {
  id: number;
  name: string;
  instructor: string;
  schedule: string;
  duration: string;
  capacity: number;
  enrolled: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent {
  classes: GymClass[] = [
    {
      id: 1,
      name: 'Yoga Flow',
      instructor: 'Sarah Johnson',
      schedule: 'Mon, Wed, Fri 9:00 AM',
      duration: '60 min',
      capacity: 20,
      enrolled: 15,
      level: 'Beginner'
    },
    {
      id: 2,
      name: 'HIIT Training',
      instructor: 'Mike Peters',
      schedule: 'Tue, Thu 6:00 PM',
      duration: '45 min',
      capacity: 15,
      enrolled: 12,
      level: 'Advanced'
    }
  ];

  showAddClass = false;
  newClass: GymClass = {
    id: 0,
    name: '',
    instructor: '',
    schedule: '',
    duration: '',
    capacity: 0,
    enrolled: 0,
    level: 'Beginner'
  };

  addClass() {
    this.newClass.id = this.classes.length + 1;
    this.classes.push({...this.newClass});
    this.showAddClass = false;
    this.resetNewClass();
  }

  deleteClass(id: number) {
    this.classes = this.classes.filter(cls => cls.id !== id);
  }

  getEnrollmentStatus(cls: GymClass): string {
    const percentage = (cls.enrolled / cls.capacity) * 100;
    if (percentage < 50) return 'low';
    if (percentage < 80) return 'medium';
    return 'high';
  }

  private resetNewClass() {
    this.newClass = {
      id: 0,
      name: '',
      instructor: '',
      schedule: '',
      duration: '',
      capacity: 0,
      enrolled: 0,
      level: 'Beginner'
    };
  }
}