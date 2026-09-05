# 1986피트니스 중산점

GitHub Pages 배포용 정적 웹사이트입니다.

## 로컬 확인

```powershell
python -m http.server 8080
```

브라우저에서 `http://localhost:8080`을 엽니다.

## GitHub Pages 배포

1. 저장소의 `Settings → Pages`로 이동합니다.
2. `Deploy from a branch`를 선택합니다.
3. 배포 브랜치와 `/ (root)` 폴더를 선택해 저장합니다.

모든 자산은 상대 경로를 사용하므로 프로젝트 저장소 하위 주소에서도 작동합니다.

## 네이버 플레이스 자동 반영

`Sync Naver Place` GitHub Actions 작업이 매시간 1986피트니스 중산점의 네이버 공식 블로그 RSS를 확인해 `data/place-feed.json`을 갱신합니다. 네이버 플레이스 직접 수집은 네이버 접근 제한으로 차단되므로 사용하지 않습니다. RSS 장애로 수집에 실패하면 작업이 실패하고 마지막 정상 데이터는 유지됩니다. Actions 화면에서 `Run workflow`로 즉시 수동 실행할 수도 있습니다.

GitHub Actions 스케줄 지연이 있을 수 있으므로 엄밀한 실시간은 아니며, 보통 다음 매시간 실행 이후 반영됩니다.
