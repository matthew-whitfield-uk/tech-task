import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsTableComponent } from './payments-table.component';
import { By } from '@angular/platform-browser';

describe('PaymentsTableComponent', () => {
  let component: PaymentsTableComponent;
  let fixture: ComponentFixture<PaymentsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentsTableComponent]
    });
    fixture = TestBed.createComponent(PaymentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display message when tableItems is empty', () => {
    // Arrange
    component.tableItems = []; // Set tableItems to an empty array

    // Act
    fixture.detectChanges();

    // Assert
    const noItemsMessageElement = fixture.debugElement.query(By.css('.no-items-message'));
    expect(noItemsMessageElement).toBeTruthy();
    expect(noItemsMessageElement.nativeElement.textContent.trim()).toBe('There are no items for this query - try changing the filters');
  });
});
