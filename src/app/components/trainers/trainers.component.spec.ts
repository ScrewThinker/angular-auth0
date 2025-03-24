import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TrainersComponent } from './trainers.component';

describe('TrainersComponent', () => {
  let component: TrainersComponent;
  let fixture: ComponentFixture<TrainersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainersComponent ],
      imports: [ FormsModule ]
    }).compileComponents();

    fixture = TestBed.createComponent(TrainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add new trainer', () => {
    const initialLength = component.trainers.length;
    component.newTrainer = {
      id: 0,
      name: 'Test Trainer',
      specialization: 'Test Specialization',
      experience: '5 years',
      availability: 'Mon-Fri',
      rating: 4.5,
      clients: 10,
      image: ''
    };

    component.addTrainer();
    expect(component.trainers.length).toBe(initialLength + 1);
    expect(component.trainers[component.trainers.length - 1].name).toBe('Test Trainer');
  });

  it('should delete trainer', () => {
    const initialLength = component.trainers.length;
    const trainerToDelete = component.trainers[0];
    
    component.deleteTrainer(trainerToDelete.id);
    expect(component.trainers.length).toBe(initialLength - 1);
    expect(component.trainers.find(t => t.id === trainerToDelete.id)).toBeUndefined();
  });

  it('should generate correct rating stars array', () => {
    const stars = component.getRatingStars(3);
    expect(stars.length).toBe(5);
    expect(stars.filter(s => s === 1).length).toBe(3);
    expect(stars.filter(s => s === 0).length).toBe(2);
  });

  it('should generate avatar URL for new trainer', () => {
    component.newTrainer.name = 'John Doe';
    component.addTrainer();
    const lastTrainer = component.trainers[component.trainers.length - 1];
    expect(lastTrainer.image).toBe('https://ui-avatars.com/api/?name=John+Doe');
  });
});