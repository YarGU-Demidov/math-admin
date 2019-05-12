import {
  HttpEvent,
  HttpInterceptor as IHttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";

export class HttpInterceptor implements IHttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var token = localStorage.getItem("jwt");
    if (!token) return next.handle(req);
    const clonedRequest = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${token}`)
    });

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }
}
