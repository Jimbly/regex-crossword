all_boards = {
  'original': {
    size: 13,
    author: 'Dan Gulotta',
    x: [
      '[^X]*(DN|TE|NI)'
      ,'[RONMHC]*I[RONMHC]*'
      ,'.*(..)\\1P+'
      ,'(E|RC|NM)*'
      ,'([^MC]|MM|CC)*'
      ,'R?(CR)*MC[MA]*'
      ,'.*'
      ,'.*CDD.*RRP.*'
      ,'(XHH|[^XH])*'
      ,'([^CME]|ME)*'
      ,'.*RXO.*'
      ,'.*LR.*RL.*'
      ,'.*EU.*ES.*'
    ],
    y: [
      '.*H.*H.*'
      ,'(DI|NS|TH|OM)*'
      ,'F.*[AO].*[AO].*'
      ,'(O|RHH|MM)*'
      ,'.*'
      ,'C*MC(CCC|MM)*'
      ,'[^C]*[^R]*III.*'
      ,'(...?)\\1*'
      ,'([^X]|XCC)*'
      ,'(RR|HHH)*.?'
      ,'N.*X.X.X.*E'
      ,'R*D*M*'
      ,'.(C|HH)*'
    ],
    z: [
      '.*H.*V.*G.*'
      ,'[RC]*'
      ,'M*XEX.*'
      ,'.*MCC.*DD.*'
      ,'.*X.*RCHX.*'
      ,'.*(.)(.)(.)(.)\\4\\3\\2\\1.*'
      ,'(NI|ES|IH).*'
      ,'[^C]*MMM[^C]*'
      ,'.*(.)X\\1C\\1.*'
      ,'[ROMEA]*HO[UMIEC]*'
      ,'(XR|[^R])*'
      ,'[^M]*M[^M]*'
      ,'(S|MM|HHH)*'
    ],
  },
  'tumbler': {
    size: 3,
    author: 'Kelly Boothby',
    x: ['(AC|KR|SH)', '.?[JKR][ACH].?', '(CS|KH|RE)'],
    y: ['(CK|HJ|RA)', '.?[AEH][AKS].?', '(AK|HR|JC)'],
    z: ['(AH|KJ|SA)', '.?[KRS][CHK].?', '(AS|JH|KE)']
  },
  'colors': {
    size: 13,
    author: 'PiggyPig',
    x: [
      '.*RED.*'
      ,'.*BLUE.*'
      ,'.*BLACK.*'
      ,'.*VIOLET.*'
      ,'([^K]|K[^K])*K?'
      ,'..[RED].*[RED]{3}'
      ,'.[ORANGE]{4}.{4}[BLUE]{4}'
      ,'(.)(.)(.)(W|\\1|\\2|\\3)*'
      ,'..R.{5}[GREEN]*.'
      ,'[^RGB]*'
      ,'(...)\\1*.?'
      ,'[FUCHSIA].W[FUCHSIA].*W'
      ,'(BLACK|LACK|ACK|K)*'
    ],
    y: [
      '([^T]|TK)*(.)\\2'
      ,'(.).(.)(\\1|\\2)*.'
      ,'[COLOR]*'
      ,'[RAINBOW]*'
      ,'(WLL[^RED])*[^L]*'
      ,'T.?[PURPLE]...[DRY].*'
      ,'T*PINK.*BLACK.*'
      ,'(.*)\\1+.?'
      ,'.?.K[IR]*...'
      ,'...[^GREY][GREY]*...'
      ,'[RGB]+[^RGB]R.*'
      ,'(.)(\\1|RED|BLUE|BLACK)*'
      ,'[DARK_RED]*'
    ],
    z: [
      '.(..)\\1*(WHITE)*'
      ,'.*(RED)?R.*RED'
      ,'[WHITE]*'
      ,'[BLUE]+([RGB]*[PINK]*){2}'
      ,'...*[^E]...'
      ,'.*W.*[IR]{2}..'
      ,'.[^RED]*'
      ,'(RED)?.*(BLUE)+.*(GREEN)?'
      ,'([RT].[RT])+...[PINK]+'
      ,'.*(WHITE|PINK|BLACK|LIGHT|DARK)'
      ,'...[OR][AN][GE]...'
      ,'...[RGBLD]*...'
      ,'.[LIGHT_BLUE]*...'
    ],
  },
}
