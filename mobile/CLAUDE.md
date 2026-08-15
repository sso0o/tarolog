# mobile

타로그의 안드로이드 앱. Capacitor로 `frontend/`(React+TS+Vite SPA) 빌드 산출물을 감싼 네이티브 프로젝트입니다. UI 코드는 `frontend/src`를 그대로 재사용하며, 이 디렉토리는 Capacitor 설정과 안드로이드 네이티브 프로젝트(`android/`)만 담습니다. 나중에 iOS를 추가할 때도 같은 Capacitor 프로젝트에 `ios/`를 더하는 방식으로 확장합니다.

## 사전 준비 (최초 1회, 사용자가 직접)

1. [Android Studio](https://developer.android.com/studio) 설치
2. Android Studio 최초 실행 시 SDK Manager에서 기본 SDK 설치 진행 (설치 마법사가 안내)
3. 설치 후 `mobile/android`를 Android Studio로 열면 자동으로 Gradle sync가 진행됩니다.

## 빌드/동기화

```bash
cd mobile
npm run build     # frontend를 모바일용(base=/)으로 빌드하고 android 프로젝트에 동기화
```

## 배포

Play Store 자동 배포 파이프라인은 없습니다. 릴리즈 빌드는 Android Studio에서 수동으로 만듭니다.

1. `mobile/android/keystore.properties`(gitignore됨, 최초 1회 직접 생성)에 서명 키 정보(`storeFile`, `storePassword`, `keyAlias`, `keyPassword`) 설정
2. Android Studio에서 `mobile/android`를 열고 **Build > Generate Signed Bundle / APK**로 AAB/APK 생성 (`app/build.gradle`의 `signingConfigs.release`가 위 `keystore.properties`를 읽음)
3. 생성된 AAB를 Play Console에 업로드
