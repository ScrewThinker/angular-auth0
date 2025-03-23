import { Component } from '@angular/core';

interface Member {
  id: number;
  name: string;
  email: string;
  membershipType: string;
  joinDate: string;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent {
  members: Member[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      membershipType: 'Premium',
      joinDate: '2023-01-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      membershipType: 'Basic',
      joinDate: '2023-02-20',
      status: 'active'
    }
  ];

  showAddMember = false;
  newMember: Member = {
    id: 0,
    name: '',
    email: '',
    membershipType: 'Basic',
    joinDate: new Date().toISOString().split('T')[0],
    status: 'active'
  };

  addMember() {
    this.newMember.id = this.members.length + 1;
    this.members.push({...this.newMember});
    this.showAddMember = false;
    this.resetNewMember();
  }

  deleteMember(id: number) {
    this.members = this.members.filter(member => member.id !== id);
  }

  toggleStatus(member: Member) {
    member.status = member.status === 'active' ? 'inactive' : 'active';
  }

  private resetNewMember() {
    this.newMember = {
      id: 0,
      name: '',
      email: '',
      membershipType: 'Basic',
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active'
    };
  }
}