import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MintingComponent } from './minting.component';

describe('MintingComponent', () => {
  let component: MintingComponent;
  let fixture: ComponentFixture<MintingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MintingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
