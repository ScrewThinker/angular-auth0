import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MembersComponent } from './members.component';

describe('MembersComponent', () => {
  let component: MembersComponent;
  let fixture: ComponentFixture<MembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersComponent ],
      imports: [ FormsModule ]
    }).compileComponents();

    fixture = TestBed.createComponent(MembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add new member', () => {
    const initialLength = component.members.length;
    component.newMember = {
      id: 0,
      name: 'Test Member',
      email: 'test@example.com',
      membershipType: 'Basic',
      joinDate: '2023-08-15',
      status: 'active'
    };

    component.addMember();
    expect(component.members.length).toBe(initialLength + 1);
    expect(component.members[component.members.length - 1].name).toBe('Test Member');
  });

  it('should delete member', () => {
    const initialLength = component.members.length;
    const memberToDelete = component.members[0];
    
    component.deleteMember(memberToDelete.id);
    expect(component.members.length).toBe(initialLength - 1);
    expect(component.members.find(m => m.id === memberToDelete.id)).toBeUndefined();
  });

  it('should toggle member status', () => {
    const member = component.members[0];
    const initialStatus = member.status;
    
    component.toggleStatus(member);
    expect(member.status).toBe(initialStatus === 'active' ? 'inactive' : 'active');
  });
});