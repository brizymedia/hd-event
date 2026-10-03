/*
 * HD기획 — 견적 품목표와 견적 코드 읽기
 *
 * quote.html 과 schedule.html 이 함께 쓴다. 품목을 고칠 곳은 여기 하나뿐이다.
 * 견적서에는 서버가 없다 — 견적 하나가 주소 뒤 #q= 에 담기는 짧은 코드 하나다.
 * 그 코드를 푸는 규칙도 여기 둔다(두 화면이 같은 규칙으로 읽어야 하니까).
 */

const CATALOG = [
  { group:'행사 진행', items:[
    { id:'p1', name:'기업행사',              spec:'송년회 · 신년회 · 창립기념 · 시상식 · 페스티벌', unit:'식', price:null },
    { id:'p2', name:'체육대회 · 워크숍',     spec:'레크리에이션 · 팀빌딩 · 명랑운동회 · 경품 진행', unit:'식', price:null },
    { id:'p3', name:'지자체행사',            spec:'지역축제 · 시민의 날 · 노래자랑 · 공연행사',     unit:'식', price:null },
    { id:'p4', name:'관공서 · 기관행사',     spec:'기념식 · 세미나 · 간담회 · 비대면 행사',         unit:'식', price:null },
    { id:'p5', name:'학교행사',              spec:'운동회 · 축제 · 동문회',                         unit:'식', price:null },
    { id:'p6', name:'기공식 · 준공식 · 개관식', spec:'테이프 커팅 · 시삽 · 의전 동선 · 축하 공연',  unit:'식', price:null },
    { id:'p7', name:'축제 · 놀이존 · 물놀이', spec:'에어바운스 · 워터밤 · 체험 부스 · 야외 무대',   unit:'식', price:null },
  ]},
  { group:'음향', items:[
    { id:'a1', name:'음향 (소형)',       spec:'실내 · 소규모 행사',                  unit:'식', price:null },
    { id:'a2', name:'음향 (중형)',       spec:'강당 · 체육관 · 연회장',              unit:'식', price:null },
    { id:'a3', name:'음향 (대형)',       spec:'야외 · 라인어레이 스피커 · 디지털 콘솔', unit:'식', price:null },
    { id:'a4', name:'무선 마이크 추가',  spec:'핸드 / 핀 마이크',                    unit:'개', price:null, qty:true },
  ]},
  { group:'무대 · 조명 · LED', items:[
    { id:'b1', name:'무대 · 트러스',     spec:'크기 · 높이 협의',                    unit:'식', price:null },
    { id:'b2', name:'무대 조명',         spec:'무빙라이트 · 개회식 · 시상식 · 공연', unit:'식', price:null },
    { id:'b3', name:'LED 전광판',        spec:'실내외 · 크기 협의',                  unit:'식', price:null },
    { id:'b4', name:'영상 · 자막 · BGM 제작', spec:'오프닝 영상 · 시상 자막 · 행사 BGM', unit:'식', price:null },
    { id:'b5', name:'레드카펫 · 의전 동선', spec:'기념식 · 기공식 · 개관식',          unit:'식', price:null },
  ]},
  { group:'천막 · 행사 물품', items:[
    { id:'d3',  name:'천막',              spec:'설치 · 철수',                        unit:'동', price:null, qty:true },
    { id:'d9',  name:'의자',              spec:'행사용 의자',                        unit:'개', price:null, qty:true },
    { id:'d12', name:'테이블',            spec:'행사용 테이블',                      unit:'개', price:null, qty:true },
    { id:'d15', name:'현수막 · 배너',     spec:'행사명 현수막 · 배너 출력',          unit:'식', price:null },
  ]},
  { group:'MC · 공연 · 강사 섭외', items:[
    { id:'f1', name:'전문 MC',              spec:'행사 성격에 맞춘 진행자',          unit:'명', price:null },
    { id:'f2', name:'가수 · 밴드 섭외',     spec:'행사 성격 · 예산에 맞는 라인업',   unit:'팀', price:null },
    { id:'f4', name:'국악 · 마술 등 공연팀', spec:'오프닝 · 축하공연',               unit:'팀', price:null },
    { id:'f6', name:'레크리에이션 강사',    spec:'체육대회 · 워크숍 · 송년회',        unit:'명', price:null },
    { id:'f8', name:'강연 강사',            spec:'세미나 · 워크숍',                   unit:'명', price:null },
    { id:'f5', name:'진행 스태프',          spec:'참가자 안내 · 경품 진행 · 현장 운영', unit:'명', price:null, qty:true },
  ]},
  { group:'체험 · 놀이존', items:[
    { id:'h1', name:'에어바운스',          spec:'공기주입식 놀이기구',                 unit:'동', price:null, qty:true },
    { id:'h3', name:'체육대회 게임도구',   spec:'명랑운동회 · 팀빌딩 종목',            unit:'식', price:null },
    { id:'h8', name:'체험 부스',           spec:'가족 단위 체험 프로그램',             unit:'동', price:null, qty:true },
    { id:'h7', name:'경품 · 시상 진행',    spec:'경품 추첨 · 시상식 운영',             unit:'식', price:null },
  ]},
  { group:'기타', items:[
    { id:'g4', name:'사진 · 영상 기록',  spec:'행사 기록 촬영 · 전달',             unit:'식', price:null },
    { id:'g1', name:'발전기',            spec:'전원 미확보 현장',                  unit:'대', price:null },
    { id:'g2', name:'운반 · 설치 인건비', spec:'상하차 · 설치 · 철수',             unit:'식', price:null },
    { id:'g3', name:'출장비',            spec:'서울 · 광명 · 남양주 외 지역',      unit:'식', price:null },
  ]},
];
const BY_ID = {};
CATALOG.forEach(g => g.items.forEach(it => { BY_ID[it.id] = it; }));

const 견적정보칸 = ['org','name','tel','email','title','date','place','people','memo'];
const 견적정보짧게 = { org:'o', name:'n', tel:'t', email:'e', title:'m', date:'d', place:'p', people:'c', memo:'x' };

const 견적b64u   = (s) => btoa(unescape(encodeURIComponent(s))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const 견적unb64u = (s) => {
  let t = String(s).replace(/-/g, '+').replace(/_/g, '/');
  while (t.length % 4) t += '=';
  return decodeURIComponent(escape(atob(t)));
};

/**
 * 견적 코드를 사람이 읽을 수 있는 모양으로 푼다.
 *   { 정보:{org,name,tel,…}, 줄:[{id,name,spec,qty,unit,days,price}], 할인 }
 * 못 읽으면 null.
 */
function 견적풀기(코드) {
  try {
    const s = JSON.parse(견적unb64u(코드));
    const 정보 = {};
    견적정보칸.forEach((k, idx) => {
      const i = s.i;
      if (!i) { 정보[k] = ''; return; }
      const v = Array.isArray(i) ? i[idx]
              : (i[견적정보짧게[k]] != null ? i[견적정보짧게[k]] : i[k]);
      정보[k] = v == null ? '' : String(v);
    });

    const 책 = (id) => BY_ID[id] || { name: '', spec: '', unit: '식' };
    const 줄 = (s.r || []).map((a) => {
      if (typeof a === 'string') {
        const c = 책(a);
        return { id: a, name: c.name, spec: c.spec, qty: 1, unit: c.unit, days: 1, price: null };
      }
      if (a.length <= 4) {
        const c = 책(a[0]);
        return { id: a[0], name: c.name, spec: c.spec,
                 qty: a[1] != null ? a[1] : 1, unit: c.unit,
                 days: a[2] != null ? a[2] : 1,
                 price: a[3] != null ? a[3] : null };
      }
      return { id: a[0], name: a[1], spec: a[2], qty: a[3], unit: a[4], days: a[5], price: a[6] };
    });

    return { 정보: 정보, 줄: 줄, 할인: +s.d || 0 };
  } catch (e) { return null; }
}

/* 견적 한 줄을 「300명 내외 · 스피커 4통 · 2개 · 2일」 같은 한 줄 설명으로 */
function 견적줄설명(r) {
  return [r.spec, (+r.qty > 1 ? r.qty + (r.unit || '') : ''), (+r.days > 1 ? r.days + '일' : '')]
    .filter(Boolean).join(' · ');
}
