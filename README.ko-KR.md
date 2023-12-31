# pseudo-control
![안내영상](assets/introduce_ko-KR.webp)

제품에서 `기술 지원 액세스 허용` 설정을 제거하세요.

pseudo-control는 WebRTC 기반의 Web Client 화면 원격 제어 라이브러리입니다. 더 이상 기술 지원을 위해 제품에 "인가된" 백도어를 만들지 마시기 바랍니다.

## 기능
- 웹 사이트 상에서 고객의 기술 지원 요청에 별도의 프로그램 설치 없이도 원격 제어 도움이 가능합니다.
- 보이는 화면에서 클릭과 호버 등 마우스 DOM 이벤트를 실행할 수 있습니다.
- 에러 처리 등 특정한 이벤트를 소스 코드에서 미리 트래킹해둔다면 원격 제어 참여자에게 더 많은 정보를 제공할 수 있습니다.

### 향후 계획
이러한 기능들은 완전한 제공을 위해서 백엔드 구현을 호스팅해야 하고, 공인된 단체 수립이 필요하기에 아직 준비하지 못했습니다. 혹시 해당 기능에 관심이 있으시다면 pseudocontrol@pseudoarticle.com 으로 문의해주세요.

- 모든 세션 참여자 실행 환경에서 스크립트와 데이터 무결성을 실시간으로 체크
- 유저의 동의 하에 JavaScript 코드를 실행
- 활동 감독을 위한 원격 제어 세션 녹화
- 네트워크 요청 캡쳐

## 문서 (English)
- [클라이언트](pseudo-control-client/README.md)
- [매니저](pseudo-control-manager/README.md)
- [서버](pseudo-control-server/README.md)

## 라이선스
[MIT 라이선스](LICENSE)
