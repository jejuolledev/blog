export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold">About</h1>
      <p className="mt-4 text-base text-text-muted">
        jejuolledev는 제주에서 제품을 만들며 기록하는 개인 블로그입니다. 작업 과정, 팀에서의
        배움, 그리고 일상의 작은 실험을 담아내는 공간입니다.
      </p>
      <div className="mt-8 space-y-4 text-sm text-text-muted">
        <p>
          저는 프론트엔드와 디자인 시스템을 사랑합니다. 더 좋은 사용자 경험을 만들기 위해 팀과
          협업하고, 작은 개선을 지속하는 것을 목표로 합니다.
        </p>
        <p>
          이 공간은 실험을 공유하고, 기록을 통해 성장을 정리하는 곳입니다. 비슷한 고민이 있다면
          언제든지 메시지를 남겨주세요.
        </p>
      </div>
    </div>
  );
}
