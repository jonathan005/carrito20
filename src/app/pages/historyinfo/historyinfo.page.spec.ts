import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HistoryinfoPage } from './historyinfo.page';

describe('HistoryinfoPage', () => {
  let component: HistoryinfoPage;
  let fixture: ComponentFixture<HistoryinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryinfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
