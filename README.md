# 📸 Snapfit 신규 팀원 온보딩 가이드  
**대상:** 예지 / 희재 / 나경  
**최종 업데이트:** 2025-11-06  

---

## 1. 👩‍💻 개발 환경 안내  

### 💻 기술 스택  
- **Frontend:** React  
- **Backend:** Python FastAPI  
- **배포:** Docker  
- **배포 환경:** AWS EC2 + Docker  

### 🌿 브랜치 전략  
- 기본 브랜치: `dev`  
- 필요 시 기능별 브랜치 추가 (추후 확장 예정)  

---

## 2. 🚀 온보딩 가이드  

### 2-1. 로컬 개발 환경 준비  

#### ✅ 레포지토리 클론  
본인의 개발 폴더에서 아래 명령어를 실행해 소스코드를 내려받습니다.

```bash
git clone https://github.com/knk642198/snapfit.git
````

---

### 2-2. 가상환경 설정

#### 📂 Snapfit 폴더로 이동

```bash
cd ~/snapfit
```

#### 🧪 가상환경 생성

```bash
python -m venv venv
```
→ 현재 폴더 안에 `venv` 폴더가 새로 생성됩니다.

#### ⚙️ 가상환경 활성화

**Mac / Linux 명령어**

```bash
source venv/bin/activate
```

**Windows 명령어**

```bash
venv\Scripts\activate
```

> 💡 프롬프트가 `(venv)`로 바뀌면 활성화에 성공한 것입니다.

---

### 2-3. 의존성 설치

가상환경이 활성화된 상태에서 프로젝트 의존성을 설치합니다.

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

---
