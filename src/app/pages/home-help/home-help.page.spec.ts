import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeHelpPage } from './home-help.page';

describe('HomeHelpPage', () => {
  let component: HomeHelpPage;
  let fixture: ComponentFixture<HomeHelpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeHelpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeHelpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
