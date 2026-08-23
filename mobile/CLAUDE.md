# mobile

타로그의 안드로이드 앱. Capacitor로 `frontend/`(React+TS+Vite SPA) 빌드 산출물을 감싼 네이티브 프로젝트입니다. UI 코드는 `frontend/src`를 그대로 재사용하며, 이 디렉토리는 Capacitor 설정과 안드로이드 네이티브 프로젝트(`android/`)만 담습니다. 나중에 iOS를 추가할 때도 같은 Capacitor 프로젝트에 `ios/`를 더하는 방식으로 확장합니다.

## 사전 준비 (최초 1회, 사용자가 직접)

1. [Android Studio](https://developer.android.com/studio) 설치
2. Android Studio 최초 실행 시 SDK Manager에서 기본 SDK 설치 진행 (설치 마법사가 안내)
3. 설치 후 `mobile/android`를 Android Studio로 열면 자동으로 Gradle sync가 진행됩니다.

## 무료/유료 빌드 (product flavor)

`android/app/build.gradle`에 `free`/`paid` product flavor가 있습니다. 서로 다른 `applicationId`(`com.tarolog.app` / `com.tarolog.app.pro`)를 가진 완전히 별개의 앱으로 빌드되어, Play Store에도 두 개의 앱으로 각각 올립니다.

`cap sync`는 flavor를 모르고 항상 `app/src/main/assets/public`에만 웹 자산을 복사하므로, 아래 npm 스크립트가 각 flavor 전용 디렉토리(`app/src/free/assets/public`, `app/src/paid/assets/public`)로 직접 복사합니다. `app/src/main/assets/public`은 더 이상 사용하지 않습니다.

```bash
cd mobile
npm run build:free   # frontend/dist-mobile 빌드 → app/src/free/assets/public
npm run build:paid   # frontend/dist-mobile-paid(VITE_APP_TIER=paid) 빌드 → app/src/paid/assets/public
npm run build         # build:free의 별칭
```

플러그인 추가/변경 등 네이티브 설정 자체가 바뀌었을 때만 `npm run sync`(`cap sync android`)를 따로 실행합니다.

Android Studio에서는 상단 Build Variants 패널에서 `freeDebug`/`paidDebug`/`freeRelease`/`paidRelease` 중 원하는 variant를 선택해 실행·빌드합니다.

## 배포

Play Store 자동 배포 파이프라인은 없습니다. 릴리즈 빌드는 Android Studio에서 수동으로 만듭니다.

1. `mobile/android/keystore.properties`(gitignore됨, 최초 1회 직접 생성)에 서명 키 정보(`storeFile`, `storePassword`, `keyAlias`, `keyPassword`) 설정
2. `npm run build:free`(또는 `build:paid`)로 해당 flavor의 웹 자산을 채워넣기
3. Android Studio에서 `mobile/android`를 열고 Build Variants에서 `freeRelease`/`paidRelease`를 선택한 뒤 **Build > Generate Signed Bundle / APK**로 AAB/APK 생성 (`app/build.gradle`의 `signingConfigs.release`가 위 `keystore.properties`를 읽음)
4. 생성된 AAB를 해당 Play Console 앱(무료용/Pro용)에 업로드
