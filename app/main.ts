import { bootstrap }      from '@angular/platform-browser-dynamic';
import {provide, enableProdMode, PLATFORM_PIPES}    from '@angular/core';
import { Http, HTTP_PROVIDERS } from '@angular/http';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { LocationStrategy, HashLocationStrategy, APP_BASE_HREF} from '@angular/common';
import { globalService }   from './common/globalService';
import { AppComponent }   from './app.component';
import { ToastsManager,ToastOptions } from 'ng2-toastr/ng2-toastr';
import {
    TranslateLoader, TranslateStaticLoader,
    TranslateService
} from 'ng2-translate/ng2-translate';

import 'semantic';

let options = {
    toastLife: 4000,
};

enableProdMode();
bootstrap(AppComponent, [
    globalService,
    ToastsManager,
    provide(ToastOptions, { useValue: new ToastOptions(options)}),
    HTTP_PROVIDERS,
    {
        provide: TranslateLoader,
        useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
        deps: [Http]
    },
    TranslateService,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    provide(APP_BASE_HREF, { useValue: '/' }),
    provide(AuthHttp, {
        useFactory: (http) => {
            return new AuthHttp(new AuthConfig({
                tokenName: 'bearer'
            }), http);
        },
        deps: [Http]
    })
]);
