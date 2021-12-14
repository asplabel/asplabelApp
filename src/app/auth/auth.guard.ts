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
    /*console.log(localStorage.getItem('userId') != null && localStorage.getItem('userId') != undefined)
    if (localStorage.getItem('userId') != null && localStorage.getItem('userId') != undefined)
    {
      console.log(window.location.href)
      if(window.location.href == 'http://localhost:4200/'){
        isAuth = false
        this.router.navigate(['/monitor'])
      }
    }*/
    return isAuth
  }

}
