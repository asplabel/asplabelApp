import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let isAuth: boolean =  this.authService.getIsAuthenticated()
    if (!isAuth){
      this.router.navigate(['/'])
    }
    return isAuth
  }

}
