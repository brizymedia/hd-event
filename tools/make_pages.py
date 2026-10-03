# -*- coding: utf-8 -*-
"""
행사 이야기(stories/) · 지역 페이지(areas/) 만들기 — 사이트 틀(머리글 · 푸터)은 portfolio.html 에서 빌려 온다.
(바로기획 tools/make_pages.py 를 HD기획 한 장짜리 사이트 구조에 맞춰 옮긴 것)

  python tools/make_pages.py

내용은 아래 STORIES · AREAS 표만 고치면 된다. 사실만 적을 것(사이트에 이미 실린 내용 · 대표님 확인분).
숫자(참가 인원) · 후기 · 고객 말은 대표님 확인 전까지 넣지 않는다.
만든 뒤 sitemap.xml 도 같이 다시 쓴다.
"""
import os, re, html, datetime

SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = 'https://brizymedia.github.io/hd-event/'
TEL = '010-3401-0118'
E = html.escape

# ── 행사 이야기 ──────────────────────────────────────────────
# 근거: assets/app.js 의 WORKS(포트폴리오 목록 — 제목 · 분야 · 연도)와 같은 사진. 장소는 제목에 드러난 것만.
# 본문은 대문(index.html)의 사업분야 · 일하는 방식 글에 적힌 HD기획의 준비 방식만 쓴다(행사별 세부 · 숫자 · 후기 없음).
# 행사별 자세한 내용(장소 · 맡은 일)은 대표님께 받아서 facts · body 에 보탤 것.
STORIES = [
    dict(slug='assembly-playzone', title='국회 개방행사 놀이존 운영', cat='관공서 · 대형행사', date='2024', place='국회 (서울 영등포구)', area='yeongdeungpo',
         lead='국회 개방행사의 놀이존 운영을 맡았습니다. 가족 단위 참가자가 많은 놀이존은 시설보다 동선과 안전이 먼저입니다.',
         facts=[('행사', '국회 개방행사 놀이존 운영'), ('분야', '관공서 · 대형행사'), ('장소', '국회 (서울 영등포구)'), ('연도', '2024')],
         body=['에어바운스 · 체험 부스처럼 가족 단위 참가자가 몰리는 놀이존은 인원이 많을수록 동선과 안전을 먼저 챙겨야 합니다.',
               'HD기획은 행사장 답사로 전원 · 동선 · 무대 위치 · 우천 대안을 먼저 확인하고, 리허설부터 철수까지 전담 스태프가 현장을 지킵니다.'],
         photos=['works/w13', 'biz/b8']),
    dict(slug='corporate-festival', title='대기업 임직원 페스티벌', cat='기업행사 · 대형행사', date='2026', place='', area='',
         lead='대기업 임직원 페스티벌을 진행했습니다. 기업 페스티벌은 임직원이 주인공이 되는 하루여야 합니다.',
         facts=[('행사', '대기업 임직원 페스티벌'), ('분야', '기업행사 · 대형행사'), ('연도', '2026')],
         body=['HD기획은 "왜 하는 행사인가"를 먼저 묻습니다. 임직원 화합인지, 고객 초청인지에 따라 프로그램과 무대, 동선이 전부 달라집니다.',
               '무대 · 음향 · 조명은 외주에 넘기지 않고 직접 운영합니다. 장비를 아는 사람이 큐시트를 써야 현장이 흔들리지 않습니다.'],
         photos=['works/w9', 'biz/b1']),
    dict(slug='fire-academy-sports', title='소방학교 신입생 체육대회', cat='관공서 · 체육대회', date='2026', place='', area='',
         lead='소방학교 신입생 체육대회를 진행했습니다. 체육대회는 참가자가 진짜로 즐기는 프로그램이 핵심입니다.',
         facts=[('행사', '소방학교 신입생 체육대회'), ('분야', '관공서 · 체육대회'), ('연도', '2026')],
         body=['HD기획의 체육대회는 레크리에이션 · 팀빌딩 · 명랑운동회 · 경품 진행으로 구성합니다.',
               '야외 행사는 안전 계획과 비 예보에 대비한 플랜 B를 미리 세워 두고 현장에 들어갑니다.'],
         photos=['works/w10', 'biz/b2']),
    dict(slug='childrens-day', title='어린이날 기념 행사 총괄', cat='지자체 · 대형행사', date='2024', place='', area='',
         lead='지자체 어린이날 기념 행사를 총괄했습니다. 아이와 가족이 함께 오는 행사는 안전을 가장 먼저 챙깁니다.',
         facts=[('행사', '어린이날 기념 행사 총괄'), ('분야', '지자체 · 대형행사'), ('연도', '2024')],
         body=['지자체 행사는 시민이 참여하고 남는 행사여야 합니다. 가족 단위 참가자가 많은 행사일수록 동선과 안전이 먼저입니다.',
               '기획서 한 장에서 무대 철수까지, HD기획은 한 팀이 끝까지 맡습니다.'],
         photos=['works/w12', 'biz/b3']),
    dict(slug='groundbreaking-ceremony', title='해외 장관 초청 기공식', cat='의전 · 기공식', date='2023', place='', area='',
         lead='해외 장관을 초청한 기공식을 진행했습니다. 절차와 의전이 중요한 자리입니다.',
         facts=[('행사', '해외 장관 초청 기공식'), ('분야', '의전 · 기공식'), ('연도', '2023')],
         body=['기공식은 테이프 커팅 · 시삽 · 의전 동선 · 축하 공연으로 이어지는 격식 있는 자리입니다.',
               '레드카펫부터 의전 동선, 사회 진행까지 — 회사와 기관의 새 출발을 정갈하게 준비합니다.'],
         photos=['works/w2']),
]

# ── 지역 ────────────────────────────────────────────────────
# 분 · km: 금천구 본사(시흥대로26길 69-24)에서 각 구청 · 시청까지 OSRM(막히지 않을 때) 2026-10-03 조회, 5분 단위 반올림
# 운영 지역은 사이트에 적힌 「서울 · 광명 · 남양주」 안에서 골랐다. 실적(done)은 사이트에 기록이 있는 것만.
AREAS = [
    dict(slug='geumcheon', name='금천', office='구청', min=0, km=0, hq=True, done=[], photos=['sys/h1_7', 'sys/h2_1', 'sys/h1_3']),
    dict(slug='guro', name='구로', office='구청', min=10, km=8.7, done=[], photos=['sys/h1_4', 'sys/h2_3', 'sys/h1_6']),
    dict(slug='gwangmyeong', name='광명', office='시청', min=10, km=7.4, done=[], photos=['slider1', 'sys/h2_5', 'sys/h1_1']),
    dict(slug='gwanak', name='관악', office='구청', min=10, km=8.9, done=[], photos=['slider3', 'sys/h1_2', 'sys/h2_4']),
    dict(slug='yeongdeungpo', name='영등포', office='구청', min=15, km=10.8, done=['국회 개방행사 놀이존 운영 (2024)'], photos=['works/w13', 'sys/h3_1', 'sys/h2_2']),
    dict(slug='mapo', name='마포', office='구청', min=15, km=16.9, done=[], photos=['sys/h3_2', 'sys/h1_5', 'sys/h2_1']),
    dict(slug='gangnam', name='강남', office='구청', min=20, km=20.4, done=[], photos=['slider5', 'sys/h3_3', 'sys/h1_8']),
    dict(slug='songpa', name='송파', office='구청', min=25, km=23.7, done=[], photos=['slider4', 'sys/h2_4', 'sys/h1_7']),
    dict(slug='namyangju', name='남양주', office='시청', min=45, km=43.6, done=[], photos=['slider2', 'sys/h1_8', 'sys/h2_3']),
]

SERVICES = [('기업행사', '송년회 · 신년회 · 창립기념 · 시상식'), ('체육대회 · 워크숍', '레크리에이션 · 팀빌딩 · 명랑운동회'), ('지자체행사', '지역축제 · 시민의 날 · 공연행사'),
            ('관공서 · 기관행사', '기념식 · 세미나 · 간담회'), ('학교행사', '운동회 · 축제 · 동문회'), ('기공식 · 준공식 · 개관식', '테이프 커팅 · 시삽 · 의전 동선'),
            ('음향 · 조명 · 무대 · LED', '행사 없이 장비만도 가능합니다'), ('축제 · 놀이존 · 물놀이', '에어바운스 · 체험 부스 · 야외 무대')]


def shell():
    s = open(os.path.join(SITE, 'portfolio.html'), encoding='utf-8').read()
    head_end = s.index('<main id="top">')
    main_end = s.index('</main>') + len('</main>')
    bottom = re.sub(r'\n<div class="lb" id="lb".*?</figure>\n</div>', '', s[main_end:], count=1, flags=re.S)   # 사진 크게 보기 창은 포트폴리오에만
    return s[:head_end], bottom


def page(path, title, desc, main, img='assets/img/hero_poster.webp', depth=1):
    top, bottom = shell()
    url = BASE + path
    top = re.sub(r'<title>.*?</title>', '<title>' + E(title) + '</title>', top, count=1)
    for prop in ('name="description"', 'property="og:description"'):
        top = re.sub(r'(<meta ' + prop + r' content=")[^"]*', r'\g<1>' + E(desc).replace('\\', '\\\\'), top, count=1)
    top = re.sub(r'(<meta property="og:title" content=")[^"]*', r'\g<1>' + E(title), top, count=1)
    top = re.sub(r'(<link rel="canonical" href=")[^"]*', r'\g<1>' + url, top, count=1)
    top = re.sub(r'(<meta property="og:url" content=")[^"]*', r'\g<1>' + url, top, count=1)
    top = re.sub(r'(<meta property="og:image" content=")[^"]*', r'\g<1>' + BASE + img, top, count=1)
    top = top.replace(' class="act"', '').replace('class="act" ', '')
    out = top + '<main id="top">\n' + main + '\n</main>' + bottom
    pre = '../' * depth
    out = re.sub(r'(href|src)="(?!https?:|mailto:|tel:|sms:|#|/|\.\./)([^"]+)"', lambda m: m.group(1) + '="' + pre + m.group(2) + '"', out)
    out = re.sub(r"url\((?!https?:)(assets/[^)]+)\)", lambda m: 'url(' + pre + m.group(1) + ')', out)
    full = os.path.join(SITE, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    open(full, 'w', encoding='utf-8', newline='\n').write(out)
    return url


def pic(f):
    return 'assets/img/' + f + '.webp'


def phead(img, crumbs, en, h1, p):
    cr = '<a href="index.html">HOME</a>' + ''.join('<span>›</span>' + c for c in crumbs)
    return ('<section class="pagehead"><div class="bg" style="background-image:url(' + pic(img) + ')"></div><div class="wrap">'
            '<div class="crumb">' + cr + '</div><small>' + en + '</small><h1>' + h1 + '</h1><p>' + p + '</p></div></section>')


def cta(title='행사 날짜가 잡히셨나요?', sub='목적 · 날짜 · 인원만 알려 주셔도 됩니다. 1영업일 안에 1차 구성안과 견적으로 답합니다.', bg='sys/h1_6'):
    return ('<section class="callband" style="background-image:url(' + pic(bg) + ')"><div class="wrap"><div class="reveal"><h2>' + title +
            '<br><em>HD기획</em>이 처음부터 끝까지 맡습니다.</h2><p>' + sub + '</p></div><div class="reveal"><a class="num" href="tel:' + TEL + '">' + TEL + '</a>'
            '<div class="btns"><a class="btn btn-pri" href="tel:' + TEL + '">전화 상담</a><a class="btn btn-white" href="quote.html">자동 견적서</a><a class="btn btn-ghost" href="index.html#contact">견적 문의 폼</a></div></div></div></section>')


def head2(en, h2, more=''):
    return '<div class="sec-head reveal"><div class="t"><span class="en-t">' + en + '</span><h2>' + h2 + '</h2></div>' + more + '</div>'


def scard(o):
    return ('<a class="scard" href="@@stories/' + o['slug'] + '.html"><img src="' + pic(o['photos'][0]) + '" alt="" loading="lazy" width="800" height="600"><span><small>' +
            E(o['cat'] + ' · ' + o['date']) + '</small>' + E(o['title']) + '</span></a>')


def story_pages():
    urls = []
    for st in STORIES:
        facts = ''.join('<dt>' + E(a) + '</dt><dd>' + E(b) + '</dd>' for a, b in st['facts'])
        body = ''.join('<p>' + E(p) + '</p>' for p in st['body'])
        photos = ''.join('<a href="' + pic(f) + '" target="_blank" rel="noopener"><img src="' + pic(f) + '" alt="' + E(st['title']) + ' 현장" loading="lazy" width="800" height="600"></a>' for f in st['photos'])
        area = next((a for a in AREAS if a['slug'] == st['area']), None)
        alink = ('<a class="alink" href="@@areas/' + area['slug'] + '.html">' + E(area['name']) + ' 행사 안내 →</a>') if area else '<a class="alink" href="@@areas/index.html">운영 지역 보기 →</a>'
        others = [o for o in STORIES if o['slug'] != st['slug']][:3]
        more = ''.join(scard(o) for o in others)
        main = (phead(st['photos'][0], ['<a href="@@stories/index.html">행사 이야기</a>', '<span>' + E(st['cat']) + '</span>'], 'Event Story', E(st['title']), E(st['lead']))
                + '<section class="sec"><div class="wrap story">'
                '<aside class="reveal"><span class="en-t">Event File</span><dl>' + facts + '</dl>'
                '<a class="btn btn-pri" href="quote.html">비슷한 행사 견적 받기</a>' + alink + '</aside>'
                '<div class="reveal sbody">' + body + '<div class="sgrid n' + str(len(st['photos'])) + '">' + photos + '</div><div class="sbtns"><a class="btn btn-line" href="portfolio.html">포트폴리오 전체 보기</a></div></div>'
                '</div></section>'
                '<section class="sec gray"><div class="wrap">' + head2('More Stories', '다른 현장 이야기', '<a class="more" href="@@stories/index.html">전체 보기 →</a>') + '<div class="scards">' + more + '</div></div></section>'
                + cta())
        urls.append(page('stories/' + st['slug'] + '.html', st['title'] + ' | HD기획 행사 이야기', st['lead'][:120], main, img=pic(st['photos'][0])))
    cards = ''.join('<a class="scard reveal" href="@@stories/' + o['slug'] + '.html"><img src="' + pic(o['photos'][0]) + '" alt="" loading="lazy" width="800" height="600"><span><small>' +
                    E(' · '.join(x for x in (o['cat'], o['date'], o['place']) if x)) + '</small>' + E(o['title']) + '<em>' + E(o['lead'][:60]) + '…</em></span></a>' for o in STORIES)
    main = (phead('sys/h2_2', ['<span>행사 이야기</span>'], 'Event Stories', '행사 이야기', 'HD기획이 맡은 행사를 한 편씩 정리했습니다. 어떤 행사였는지, 무엇을 먼저 챙기는지 사진과 함께 보실 수 있습니다.')
            + '<section class="sec"><div class="wrap"><div class="scards big">' + cards + '</div><p class="snote">더 많은 현장 사진은 <a href="portfolio.html">포트폴리오</a>에 있습니다.</p></div></section>' + cta())
    urls.insert(0, page('stories/index.html', '행사 이야기 | HD기획 — 기업행사 · 체육대회 · 지자체 · 기공식 현장 기록', 'HD기획이 맡은 행사를 한 편씩 정리했습니다. 국회 개방행사 놀이존, 임직원 페스티벌, 소방학교 체육대회, 어린이날 행사, 기공식 현장.', main, img=pic('sys/h2_2')))
    return urls


def how_far(a):
    if a.get('hq'):
        return '<b>HD기획 본사</b>가 있는 곳입니다. 서울시 금천구 시흥대로26길 69-24 — 행사장 답사와 1차 구성안은 무료로 도와드립니다.'
    return ('금천구 본사에서 ' + a['name'] + ' ' + a['office'] + '까지 차로 약 <b>' + str(a['min']) + '분 · ' + ('%g' % a['km']) + 'km</b>(막히지 않을 때 기준)입니다. '
            '행사장 답사로 전원 · 동선 · 무대 위치 · 우천 대안을 먼저 확인합니다.')


def area_pages():
    urls = []
    for a in AREAS:
        n = a['name']
        if a['done']:
            done = '<ul class="alist">' + ''.join('<li>' + E(x) + '</li>' for x in a['done']) + '</ul>'
        else:
            done = '<p class="muted">아직 이 페이지에 적을 만큼 정리된 기록이 없습니다. ' + n + ' 행사도 금천구 본사에서 출발해 똑같이 준비합니다.</p>'
        stories = [s for s in STORIES if s['area'] == a['slug']]
        sl = ''.join(scard(s) for s in stories)
        svc = ''.join('<li><b>' + E(x) + '</b><span>' + E(y) + '</span></li>' for x, y in SERVICES)
        photos = ''.join('<img src="' + pic(f) + '" alt="HD기획 행사 현장" loading="lazy" width="800" height="600">' for f in a['photos'])
        others = ' · '.join('<a href="@@areas/' + o['slug'] + '.html">' + o['name'] + '</a>' for o in AREAS if o['slug'] != a['slug'])
        title = n + ' 행사대행 · 기업행사 · 체육대회 · 기념식 | HD기획'
        desc = n + ' 기업행사 · 체육대회 · 워크숍 · 지자체 · 학교 · 기념식, 무대 · 음향 · 조명까지. ' + ('금천구 본사.' if a.get('hq') else '금천구 본사에서 차로 약 ' + str(a['min']) + '분.') + ' 행사의 처음부터 끝까지 한 팀이 맡는 HD기획.'
        main = (phead(a['photos'][0], ['<a href="@@areas/index.html">운영 지역</a>', '<span>' + n + '</span>'], 'Service Area', n + ' 행사, HD기획이 갑니다',
                      '기업행사 · 체육대회 · 워크숍 · 지자체 · 학교 · 기념식. 기획서 한 장에서 무대 철수까지, ' + n + ' 현장도 HD기획 한 팀이 끝까지 맡습니다.')
                + '<section class="sec"><div class="wrap area3"><div class="reveal"><span class="en-t">How Far</span><h2 class="h2s">' + n + (' — 본사' if a.get('hq') else '까지') + '</h2><p>' + how_far(a) + '</p>'
                '<h3 class="h3s">' + n + '에서 한 행사</h3>' + done + ('<div class="scards sm">' + sl + '</div>' if sl else '') + '</div>'
                '<div class="reveal"><div class="apics">' + photos + '</div></div></div></section>'
                '<section class="sec gray"><div class="wrap">' + head2('What We Do', n + '에서도 이런 행사를 맡습니다') + '<ul class="asvc">' + svc + '</ul>'
                '<p class="snote">다른 지역: ' + others + ' · <a href="@@areas/index.html">운영 지역 전체</a></p></div></section>' + cta(n + ' 행사 날짜가 잡히셨나요?'))
        urls.append(page('areas/' + a['slug'] + '.html', title, desc, main, img=pic(a['photos'][0])))
    rows = ''.join('<a class="arow" href="@@areas/' + a['slug'] + '.html"><b>' + a['name'] + '</b><span>' + ('본사' if a.get('hq') else '차로 약 ' + str(a['min']) + '분 · ' + ('%g' % a['km']) + 'km') + '</span><em>' +
                   (E(a['done'][0]) if a['done'] else ('행사장 답사 무료' if a.get('hq') else '직접 답사 · 진행')) + '</em></a>' for a in AREAS)
    main = (phead('sys/h1_8', ['<span>운영 지역</span>'], 'Service Area', '운영 지역', '금천구 본사에서 서울 · 광명 · 남양주 어디든 직접 갑니다. 지역을 누르면 이동 시간과 그 지역에서 한 행사를 보실 수 있습니다.')
            + '<section class="sec"><div class="wrap"><div class="reveal"><div class="arows">' + rows + '</div><p class="snote">이동 시간은 금천구 본사에서 각 구청 · 시청까지 차로 걸리는 시간(막히지 않을 때 기준)입니다. 출퇴근 시간에는 더 걸릴 수 있고, 표에 없는 지역도 전화 주시면 상담해 드립니다.</p></div></div></section>' + cta())
    urls.insert(0, page('areas/index.html', '운영 지역 | HD기획 — 서울 금천 · 구로 · 영등포 · 관악 · 강남 · 송파 · 마포 · 광명 · 남양주 행사대행', '금천구 본사에서 서울 · 광명 · 남양주 어디든. 지역별 이동 시간과 그 지역에서 한 행사를 보실 수 있습니다.', main, img=pic('sys/h1_8')))
    return urls


def fix_same_folder():
    """@@stories/x.html 같은 표시를 실제 상대 경로로(두 폴더 모두 한 단계 아래라 ../ 로 통일)."""
    for d in ('stories', 'areas'):
        for f in os.listdir(os.path.join(SITE, d)):
            p = os.path.join(SITE, d, f)
            s = open(p, encoding='utf-8').read()
            s = s.replace('../@@', '../').replace('@@', '../')
            open(p, 'w', encoding='utf-8', newline='\n').write(s)


def sitemap(extra):
    today = datetime.date.today().isoformat()
    pages = ['', 'portfolio.html', 'quote.html']
    urls = [BASE + p for p in pages] + extra
    xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + ''.join('  <url><loc>' + u + '</loc><lastmod>' + today + '</lastmod></url>\n' for u in urls) + '</urlset>\n'
    open(os.path.join(SITE, 'sitemap.xml'), 'w', encoding='utf-8', newline='\n').write(xml)


if __name__ == '__main__':
    a = story_pages(); b = area_pages(); fix_same_folder(); sitemap(a + b)
    print('행사 이야기', len(a), '· 지역', len(b), '· sitemap.xml 갱신')
