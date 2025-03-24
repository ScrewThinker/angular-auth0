import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ClassesComponent } from './classes.component';

describe('ClassesComponent', () => {
  let component: ClassesComponent;
  let fixture: ComponentFixture<ClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassesComponent ],
      imports: [ FormsModule ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add new class', () => {
    const initialLength = component.classes.length;
    component.newClass = {
      id: 0,
      name: 'Test Class',
      instructor: 'Test Instructor',
      schedule: 'Mon, Wed 10:00 AM',
      duration: '60 min',
      capacity: 20,
      enrolled: 0,
      level: 'Beginner'
    };

    component.addClass();
    expect(component.classes.length).toBe(initialLength + 1);
    expect(component.classes[component.classes.length - 1].name).toBe('Test Class');
  });

  it('should delete class', () => {
    const initialLength = component.classes.length;
    const classToDelete = component.classes[0];
    
    component.deleteClass(classToDelete.id);
    expect(component.classes.length).toBe(initialLength - 1);
    expect(component.classes.find(c => c.id === classToDelete.id)).toBeUndefined();
  });

  it('should get correct enrollment status', () => {
    const testClass = {
      id: 1,
      name: 'Test',
      instructor: 'Test',
      schedule: 'Test',
      duration: 'Test',
      capacity: 20,
      enrolled: 5,
      level: 'Beginner' as const
    };

    expect(component.getEnrollmentStatus(testClass)).toBe('low');
    testClass.enrolled = 12;
    expect(component.getEnrollmentStatus(testClass)).toBe('medium');
    testClass.enrolled = 18;
    expect(component.getEnrollmentStatus(testClass)).toBe('high');
  });
});