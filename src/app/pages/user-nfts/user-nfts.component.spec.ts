import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNftsComponent } from './user-nfts.component';

describe('UserNftsComponent', () => {
  let component: UserNftsComponent;
  let fixture: ComponentFixture<UserNftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserNftsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserNftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
