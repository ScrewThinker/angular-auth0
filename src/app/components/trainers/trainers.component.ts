import { Component } from '@angular/core';

interface Trainer {
  id: number;
  name: string;
  specialization: string;
  experience: string;
  availability: string;
  rating: number;
  clients: number;
  image: string;
}

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.scss']
})
export class TrainersComponent {
  trainers: Trainer[] = [
    {
      id: 1,
      name: 'Mike Johnson',
      specialization: 'Strength Training',
      experience: '8 years',
      availability: 'Mon-Fri, 9AM-5PM',
      rating: 4.8,
      clients: 15,
      image: 'https://ui-avatars.com/api/?name=Mike+Johnson'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      specialization: 'Yoga & Pilates',
      experience: '6 years',
      availability: 'Tue-Sat, 10AM-6PM',
      rating: 4.9,
      clients: 12,
      image: 'https://ui-avatars.com/api/?name=Sarah+Wilson'
    }
  ];

  showAddTrainer = false;
  newTrainer: Trainer = {
    id: 0,
    name: '',
    specialization: '',
    experience: '',
    availability: '',
    rating: 5.0,
    clients: 0,
    image: ''
  };

  addTrainer() {
    this.newTrainer.id = this.trainers.length + 1;
    this.newTrainer.image = `https://ui-avatars.com/api/?name=${this.newTrainer.name.replace(' ', '+')}`;
    this.trainers.push({...this.newTrainer});
    this.showAddTrainer = false;
    this.resetNewTrainer();
  }

  deleteTrainer(id: number) {
    this.trainers = this.trainers.filter(trainer => trainer.id !== id);
  }

  getRatingStars(rating: number): number[] {
    return Array(5).fill(0).map((_, index) => index < Math.floor(rating) ? 1 : 0);
  }

  private resetNewTrainer() {
    this.newTrainer = {
      id: 0,
      name: '',
      specialization: '',
      experience: '',
      availability: '',
      rating: 5.0,
      clients: 0,
      image: ''
    };
  }
}