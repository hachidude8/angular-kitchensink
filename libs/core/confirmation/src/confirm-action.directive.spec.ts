import { ConfirmActionDirective } from './confirm-action.directive';


describe('ConfirmActionDirective', () => {
  it('should create an instance', () => {
    const directive = new ConfirmActionDirective(undefined, { title: 'Testing confirmation!' });
    expect(directive).toBeTruthy();
  });
});
