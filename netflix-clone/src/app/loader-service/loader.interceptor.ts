import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from './loader.service';
import { delay, finalize } from 'rxjs/operators';


export function LoaderInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const loaderService = inject(LoaderService);

  loaderService.show();

  return next(req).pipe(
    delay(500),
    finalize(() => loaderService.hide())
  )
}