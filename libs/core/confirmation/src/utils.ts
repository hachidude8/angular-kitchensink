import { ConfirmDetails } from './models';


export function isConfirmDetails(contents: unknown): contents is ConfirmDetails {
  if (contents && typeof contents === 'object') {
    const titleKey = Object.keys(contents).find(key => key === 'title');
    if (!titleKey) {
      return false;
    }
    const value: unknown | undefined = (contents as ConfirmDetails).title;
    return !!value && typeof value === 'string';
  }
  return false;
}
