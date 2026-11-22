// ══════════════════════════════════════════════════════════════════
// data.js — fonte única de dados do Event ID Flow Graph
// Usado por index.html (grafo) e treino.html (modo treino).
// Corrija aqui e a correção vale para as duas páginas.
// ══════════════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════════════
// DATA — 7 camadas lógicas, ~200 eventos
// Cada evento: id, short (rótulo curto), desc, crit, log, legacy, mitre
// succs: IDs que naturalmente se seguem a este (dentro e entre camadas)
// ══════════════════════════════════════════════════════════════════
const LAYERS = [
  {
    id:"l1", name:"Sistema", color:"#5F5E5A",
    desc:"Eventos de ciclo de vida do sistema operacional",
    events:[
      {id:"41",   short:"Crash",         desc:"Sistema reiniciou sem desligamento correto anterior",            crit:"Medium",log:"System",  legacy:"N/A", mitre:"",                            succs:["6008","4608"]},
      {id:"12",   short:"OS Start",      desc:"Startup do sistema operacional registrado pelo kernel",          crit:"Low",   log:"System",  legacy:"N/A", mitre:"",                            succs:["6005","4608"]},
      {id:"13",   short:"OS Shutdown",   desc:"Shutdown do sistema operacional registrado pelo kernel",         crit:"Low",   log:"System",  legacy:"N/A", mitre:"",                            succs:["6006","4609"]},
      {id:"6005", short:"Log Started",   desc:"Serviço de log de eventos iniciado — indica startup do sistema", crit:"Low",  log:"System",  legacy:"N/A", mitre:"",                            succs:["4608","4624"]},
      {id:"6006", short:"Log Stopped",   desc:"Serviço de log de eventos parado — indica shutdown correto",     crit:"Low",  log:"System",  legacy:"N/A", mitre:"",                            succs:["4609"]},
      {id:"6008", short:"Unexp.Shutdown",desc:"O desligamento anterior do sistema foi inesperado",             crit:"Medium",log:"System",  legacy:"N/A", mitre:"",                            succs:["4608"]},
      {id:"6009", short:"OS Version",    desc:"Versão do Windows detectada no boot",                           crit:"Low",   log:"System",  legacy:"N/A", mitre:"",                            succs:["6005"]},
      {id:"6013", short:"Uptime",        desc:"Exibe o uptime do computador em segundos",                       crit:"Low",  log:"System",  legacy:"N/A", mitre:"",                            succs:[]},
      {id:"4608", short:"Win Starting",  desc:"Windows está iniciando",                                        crit:"Low",   log:"Security",legacy:"512", mitre:"",                            succs:["4610","4611","4614","4624"]},
      {id:"4609", short:"Win Shutting",  desc:"Windows está desligando",                                       crit:"Low",   log:"Security",legacy:"513", mitre:"",                            succs:["6006"]},
      {id:"1074", short:"Shutdown Init", desc:"Desligamento ou reinício iniciado por usuário ou processo",     crit:"Low",   log:"System",  legacy:"N/A", mitre:"",                            succs:["4609","6006"]},
      {id:"4610", short:"Auth Pkg Load", desc:"Pacote de autenticação carregado pela LSA",                     crit:"Low",   log:"Security",legacy:"514", mitre:"",                            succs:["4611"]},
      {id:"4611", short:"Logon Proc",    desc:"Processo de logon confiável registrado com a LSA",              crit:"Low",   log:"Security",legacy:"515", mitre:"",                            succs:["4614"]},
      {id:"4614", short:"Notif Pkg",     desc:"Pacote de notificação carregado pelo SAM",                      crit:"Low",   log:"Security",legacy:"518", mitre:"",                            succs:["4622"]},
      {id:"4622", short:"Sec Pkg Load",  desc:"Pacote de segurança carregado pela LSA",                        crit:"Low",   log:"Security",legacy:"N/A", mitre:"",                            succs:["4624"]},
      {id:"4826", short:"BCD Loaded",    desc:"Dados de configuração do boot carregados",                      crit:"Low",   log:"Security",legacy:"N/A", mitre:"",                            succs:["6005"]},
    ]
  },
  {
    id:"l2", name:"Autenticação", color:"#185FA5",
    desc:"Quem tenta entrar, como e com qual resultado",
    events:[
      {id:"4625", short:"Logon Failed",  desc:"Uma conta falhou ao fazer logon",                               crit:"Low",   log:"Security",legacy:"529-537,539",mitre:"T1110 – Brute Force",   succs:["4740","4625","4624"]},
      {id:"4740", short:"Locked Out",    desc:"Uma conta de usuário foi bloqueada",                            crit:"Medium",log:"Security",legacy:"644",        mitre:"T1110 – Brute Force",   succs:["4767","4625"]},
      {id:"4767", short:"Unlocked",      desc:"Uma conta de usuário foi desbloqueada",                        crit:"Low",   log:"Security",legacy:"671",         mitre:"",                      succs:["4624"]},
      {id:"4624", short:"Logon OK",      desc:"Uma conta fez logon com sucesso",                              crit:"Low",   log:"Security",legacy:"528,540",     mitre:"T1078 – Valid Accounts", succs:["4672","4634","4648","4688","4778","5140"]},
      {id:"4634", short:"Logoff",        desc:"Uma conta fez logoff",                                         crit:"Low",   log:"Security",legacy:"538",         mitre:"",                      succs:["4647"]},
      {id:"4647", short:"User Logoff",   desc:"Logoff iniciado pelo usuário",                                 crit:"Low",   log:"Security",legacy:"551",         mitre:"",                      succs:["4634"]},
      {id:"4648", short:"Explicit Cred", desc:"Tentativa de logon com credenciais explícitas",                crit:"Low",   log:"Security",legacy:"552",         mitre:"T1134 – Token Manip.",  succs:["4624","4672"]},
      {id:"4649", short:"Replay Detect", desc:"Um ataque de replay foi detectado",                            crit:"High",  log:"Security",legacy:"N/A",         mitre:"",                      succs:[]},
      {id:"4768", short:"TGT Request",   desc:"Ticket de autenticação Kerberos (TGT) foi solicitado",         crit:"Low",   log:"Security",legacy:"672",         mitre:"T1558 – Kerberos",      succs:["4769","4624"]},
      {id:"4769", short:"TGS Request",   desc:"Ticket de serviço Kerberos (TGS) foi solicitado",             crit:"Low",   log:"Security",legacy:"673",         mitre:"T1558 – Kerberos",      succs:["4624","4770"]},
      {id:"4770", short:"TGS Renew",     desc:"Ticket de serviço Kerberos renovado",                         crit:"Low",   log:"Security",legacy:"674",         mitre:"",                      succs:["4769"]},
      {id:"4771", short:"Kerb PreAuth",  desc:"Pré-autenticação Kerberos falhou",                            crit:"Low",   log:"Security",legacy:"675",         mitre:"T1558 – Kerberos",      succs:["4768","4625"]},
      {id:"4772", short:"TGT Failed",    desc:"Solicitação de ticket de autenticação Kerberos falhou",        crit:"Low",   log:"Security",legacy:"N/A",         mitre:"",                      succs:["4625"]},
      {id:"4773", short:"TGS Failed",    desc:"Solicitação de ticket de serviço Kerberos falhou",            crit:"Low",   log:"Security",legacy:"N/A",         mitre:"",                      succs:[]},
      {id:"4776", short:"NTLM Validate", desc:"DC tentou validar as credenciais de uma conta via NTLM",      crit:"Low",   log:"Security",legacy:"680,681",         mitre:"T1110 – Brute Force",   succs:["4624","4625"]},
      {id:"1149", short:"RDP Auth",      desc:"Autenticação de usuário bem-sucedida numa conexão RDP (registra IP de origem antes do logon)",crit:"Low",log:"TerminalServices-RemoteConnectionManager/Operational",legacy:"N/A",mitre:"T1021 – Remote Services",succs:["4624"]},
      {id:"4777", short:"NTLM Failed",   desc:"DC falhou ao validar as credenciais de uma conta",            crit:"Low",   log:"Security",legacy:"N/A",         mitre:"",                      succs:["4625"]},
      {id:"4820", short:"TGT Denied",    desc:"TGT Kerberos negado – dispositivo não atende restrições",     crit:"Low",   log:"Security",legacy:"N/A",         mitre:"",                      succs:[]},
      {id:"4821", short:"TGS Denied",    desc:"Ticket de serviço Kerberos negado – restrições de acesso",   crit:"Low",   log:"Security",legacy:"N/A",         mitre:"",                      succs:[]},
      {id:"4822", short:"NTLM ProtUser", desc:"Autenticação NTLM falhou – conta no grupo Protected User",   crit:"Low",   log:"Security",legacy:"N/A",         mitre:"",                      succs:[]},
      {id:"4823", short:"NTLM ACL",      desc:"Autenticação NTLM falhou – restrições de controle de acesso",crit:"Low",   log:"Security",legacy:"N/A",         mitre:"",                      succs:[]},
      {id:"4824", short:"Kerb DES Fail", desc:"Pré-autenticação Kerberos via DES/RC4 falhou (Protected User)",crit:"Low", log:"Security",legacy:"N/A",         mitre:"",                      succs:[]},
      {id:"4618", short:"Event Pattern",  desc:"Um padrão de evento de segurança monitorado ocorreu",           crit:"High", log:"Security",legacy:"N/A",         mitre:"",                      succs:[]},
    ]
  },
  {
    id:"l3", name:"Autorização & Sessão", color:"#3B6D11",
    desc:"O que acontece imediatamente após o logon bem-sucedido",
    events:[
      {id:"4672", short:"Special Privs", desc:"Privilégios especiais atribuídos ao novo logon",              crit:"Low",   log:"Security",legacy:"576",         mitre:"T1078 – Valid Accounts", succs:["4688","4673","4674"]},
      {id:"4964", short:"Special Groups",desc:"Grupos especiais foram atribuídos a novo logon",              crit:"High",  log:"Security",legacy:"N/A",         mitre:"",                      succs:["4672"]},
      {id:"4778", short:"Session Recon", desc:"Uma sessão foi reconectada a uma Estação Windows",            crit:"Low",   log:"Security",legacy:"N/A",         mitre:"",                      succs:["4688"]},
      {id:"4779", short:"Session Disc",  desc:"Uma sessão foi desconectada de uma Estação Windows",         crit:"Low",   log:"Security",legacy:"N/A",         mitre:"",                      succs:["4634"]},
      {id:"4800", short:"WS Locked",     desc:"A estação de trabalho foi bloqueada",                        crit:"Low",   log:"Security",legacy:"N/A",         mitre:"",                      succs:["4801"]},
      {id:"4801", short:"WS Unlocked",   desc:"A estação de trabalho foi desbloqueada",                     crit:"Low",   log:"Security",legacy:"N/A",         mitre:"",                      succs:["4624"]},
      {id:"4802", short:"Screensaver On",desc:"O protetor de tela foi ativado",                             crit:"Low",   log:"Security",legacy:"N/A",         mitre:"",                      succs:["4800"]},
      {id:"4803", short:"Screensaver Off",desc:"O protetor de tela foi desativado",                         crit:"Low",   log:"Security",legacy:"N/A",         mitre:"",                      succs:["4801"]},
      {id:"4825", short:"RDP Denied",    desc:"Usuário teve acesso ao Remote Desktop negado",               crit:"Low",   log:"Security",legacy:"N/A",         mitre:"",                      succs:[]},
      {id:"4626", short:"Claims Info",   desc:"Informações de reivindicações de usuário/dispositivo",       crit:"Low",   log:"Security",legacy:"N/A",         mitre:"",                      succs:[]},
      {id:"4627", short:"Group Members", desc:"Informações de associação em grupo",                         crit:"Low",   log:"Security",legacy:"N/A",         mitre:"",                      succs:[]},
      {id:"4774", short:"Acct Mapped",   desc:"Uma conta foi mapeada para logon",                           crit:"Low",   log:"Security",legacy:"N/A",         mitre:"",                      succs:["4624"]},
      {id:"4775", short:"Map Failed",    desc:"Uma conta não pôde ser mapeada para logon",                  crit:"Low",   log:"Security",legacy:"N/A",         mitre:"",                      succs:["4625"]},
    ]
  },
  {
    id:"l4", name:"Identidade & Grupos", color:"#854F0B",
    desc:"Criação, modificação e exclusão de contas e grupos",
    events:[
      {id:"4720", short:"User Created",  desc:"Uma conta de usuário foi criada",                            crit:"Low",   log:"Security",legacy:"624",         mitre:"T1136 – Create Account", succs:["4722","4728","4732"]},
      {id:"4722", short:"User Enabled",  desc:"Uma conta de usuário foi habilitada",                       crit:"Low",   log:"Security",legacy:"626",         mitre:"",                      succs:["4624"]},
      {id:"4723", short:"Pwd Change",    desc:"Tentativa de alterar a senha de uma conta",                 crit:"Low",   log:"Security",legacy:"627",         mitre:"",                      succs:[]},
      {id:"4724", short:"Pwd Reset",     desc:"Tentativa de redefinir a senha de uma conta",              crit:"Medium",log:"Security",legacy:"628",          mitre:"T1098 – Acct Manip.",   succs:["4624"]},
      {id:"4725", short:"User Disabled", desc:"Uma conta de usuário foi desabilitada",                    crit:"Low",   log:"Security",legacy:"629",          mitre:"",                      succs:[]},
      {id:"4726", short:"User Deleted",  desc:"Uma conta de usuário foi deletada",                        crit:"Low",   log:"Security",legacy:"630",          mitre:"",                      succs:[]},
      {id:"4738", short:"User Changed",  desc:"Uma conta de usuário foi alterada",                        crit:"Low",   log:"Security",legacy:"642",          mitre:"",                      succs:[]},
      {id:"5136", short:"AD Obj Chg",    desc:"Um objeto do serviço de diretório (AD) foi modificado — mostra atributo e valor",crit:"Medium",log:"Security",legacy:"N/A",mitre:"T1098 – Acct Manip.",succs:[]},
      {id:"4781", short:"Acct Renamed",  desc:"O nome de uma conta foi alterado",                         crit:"Low",   log:"Security",legacy:"N/A",          mitre:"",                      succs:[]},
      {id:"4782", short:"Pwd Hash Acc.", desc:"O hash de senha de uma conta foi acessado",                crit:"Low",   log:"Security",legacy:"N/A",          mitre:"T1003 – Cred Dump",     succs:[]},
      {id:"4793", short:"Pwd Policy",    desc:"API de verificação de política de senha foi chamada",      crit:"Low",   log:"Security",legacy:"N/A",          mitre:"",                      succs:[]},
      {id:"4797", short:"Blank Pwd",     desc:"Tentativa de verificar existência de senha em branco",     crit:"Low",   log:"Security",legacy:"N/A",          mitre:"",                      succs:[]},
      {id:"4798", short:"LocalGrp Enum", desc:"Associação em grupo local de um usuário foi enumerada",   crit:"Low",   log:"Security",legacy:"N/A",          mitre:"T1069 – Grp Discovery", succs:[]},
      {id:"4799", short:"SecGrp Enum",   desc:"Associação em grupo local com segurança habilitada enumerada",crit:"Low",log:"Security",legacy:"N/A",          mitre:"",                      succs:[]},
      {id:"4727", short:"Global Grp+",   desc:"Um grupo global com segurança habilitada foi criado",      crit:"Medium",log:"Security",legacy:"631",          mitre:"",                      succs:["4728"]},
      {id:"4728", short:"Global Mbr+",   desc:"Membro adicionado a grupo global com segurança habilitada",crit:"Medium",log:"Security",legacy:"632",         mitre:"T1098 – Acct Manip.",   succs:["4624"]},
      {id:"4729", short:"Global Mbr-",   desc:"Membro removido de grupo global com segurança habilitada", crit:"Low",  log:"Security",legacy:"633",          mitre:"",                      succs:[]},
      {id:"4730", short:"Global Grp-",   desc:"Grupo global com segurança habilitada foi deletado",       crit:"Low",  log:"Security",legacy:"634",          mitre:"",                      succs:[]},
      {id:"4731", short:"Local Grp+",    desc:"Grupo local com segurança habilitada foi criado",          crit:"Low",  log:"Security",legacy:"635",          mitre:"",                      succs:["4732"]},
      {id:"4732", short:"Local Mbr+",    desc:"Membro adicionado a grupo local com segurança habilitada", crit:"Medium",log:"Security",legacy:"636",         mitre:"T1098 – Acct Manip.",   succs:["4624"]},
      {id:"4733", short:"Local Mbr-",    desc:"Membro removido de grupo local com segurança habilitada",  crit:"Low",  log:"Security",legacy:"637",          mitre:"",                      succs:[]},
      {id:"4734", short:"Local Grp-",    desc:"Grupo local com segurança habilitada foi deletado",        crit:"Low",  log:"Security",legacy:"638",          mitre:"",                      succs:[]},
      {id:"4735", short:"Local Grp Chg", desc:"Grupo local com segurança habilitada foi alterado",        crit:"Medium",log:"Security",legacy:"639",         mitre:"",                      succs:[]},
      {id:"4737", short:"Global Grp Chg",desc:"Grupo global com segurança habilitada foi alterado",       crit:"Medium",log:"Security",legacy:"641",         mitre:"",                      succs:[]},
      {id:"4754", short:"Univ Grp+",     desc:"Grupo universal com segurança habilitada foi criado",      crit:"Medium",log:"Security",legacy:"658",         mitre:"",                      succs:["4756"]},
      {id:"4755", short:"Univ Grp Chg",  desc:"Grupo universal com segurança habilitada foi alterado",    crit:"Medium",log:"Security",legacy:"659",         mitre:"",                      succs:[]},
      {id:"4756", short:"Univ Mbr+",     desc:"Membro adicionado a grupo universal com segurança habilitada",crit:"Medium",log:"Security",legacy:"660",      mitre:"T1098 – Acct Manip.",   succs:[]},
      {id:"4757", short:"Univ Mbr-",     desc:"Membro removido de grupo universal com segurança habilitada",crit:"Low", log:"Security",legacy:"661",         mitre:"",                      succs:[]},
      {id:"4758", short:"Univ Grp-",     desc:"Grupo universal com segurança habilitada foi deletado",    crit:"Low",  log:"Security",legacy:"662",          mitre:"",                      succs:[]},
      {id:"4764", short:"Grp Type Chg",  desc:"Tipo de grupo foi alterado",                               crit:"Medium",log:"Security",legacy:"668",         mitre:"",                      succs:[]},
      {id:"4765", short:"SID Hist Add",  desc:"SID History foi adicionado a uma conta",                   crit:"High", log:"Security",legacy:"N/A",          mitre:"",                      succs:[]},
      {id:"4766", short:"SID Hist Fail", desc:"Tentativa de adicionar SID History a uma conta falhou",    crit:"High", log:"Security",legacy:"N/A",          mitre:"",                      succs:[]},
      {id:"4780", short:"Admin ACL Set", desc:"ACL definida em contas membros de grupos de administradores",crit:"Medium",log:"Security",legacy:"684",        mitre:"",                      succs:[]},
      {id:"4741", short:"Comp Acct+",    desc:"Uma conta de computador foi criada",                       crit:"Low",  log:"Security",legacy:"645",          mitre:"T1136 – Create Account", succs:["4742"]},
      {id:"4742", short:"Comp Acct Chg", desc:"Uma conta de computador foi alterada",                    crit:"Low",  log:"Security",legacy:"646",          mitre:"",                      succs:[]},
      {id:"4743", short:"Comp Acct-",    desc:"Uma conta de computador foi deletada",                    crit:"Low",  log:"Security",legacy:"647",          mitre:"",                      succs:[]},
      {id:"4739", short:"Domain Policy", desc:"Política de domínio foi alterada",                          crit:"Medium",log:"Security",legacy:"643",         mitre:"",                      succs:[]},
      {id:"4713", short:"Kerb Policy",   desc:"Política Kerberos foi alterada",                            crit:"Medium",log:"Security",legacy:"617",         mitre:"T1558 – Kerberos",      succs:[]},
      {id:"4714", short:"EFS Policy",    desc:"Política de recuperação de dados criptografados foi alterada",crit:"Medium",log:"Security",legacy:"618",       mitre:"",                      succs:[]},
      {id:"4675", short:"SIDs Filtered", desc:"SIDs foram filtrados durante autenticação cross-domain",    crit:"Medium",log:"Security",legacy:"N/A",         mitre:"",                      succs:[]},
    ]
  },
  {
    id:"l5", name:"Processos & Serviços", color:"#533489",
    desc:"Criação de processos, serviços e tarefas agendadas",
    events:[
      {id:"4688", short:"Proc Created",  desc:"Um novo processo foi criado",                               crit:"Low",  log:"Security",legacy:"592",          mitre:"T1059 – Scripting",     succs:["4689","4656","4663","4697","4698","4104"]},
      {id:"4689", short:"Proc Exited",   desc:"Um processo foi encerrado",                                 crit:"Low",  log:"Security",legacy:"593",          mitre:"",                      succs:[]},
      {id:"4690", short:"Handle Dup",    desc:"Tentativa de duplicar um handle para um objeto",            crit:"Low",  log:"Security",legacy:"N/A",          mitre:"",                      succs:[]},
      {id:"4696", short:"Token Assigned",desc:"Um token primário foi atribuído ao processo",               crit:"Low",  log:"Security",legacy:"N/A",          mitre:"",                      succs:["4688"]},
      {id:"4697", short:"Svc Installed", desc:"Um serviço foi instalado no sistema",                       crit:"Low",  log:"Security",legacy:"N/A",          mitre:"T1543 – Sys Process",   succs:["7045","7036","4688"]},
      {id:"7045", short:"New Service",   desc:"Novo serviço Windows instalado",                            crit:"Low",  log:"System",  legacy:"N/A",          mitre:"T1543 – Sys Process",   succs:["7036","4688"]},
      {id:"7000", short:"Svc Start Fail",desc:"Falha ao iniciar serviço",                                  crit:"Low",  log:"System",  legacy:"N/A",          mitre:"",                      succs:[]},
      {id:"7036", short:"Svc State Chg", desc:"Serviço entrou no estado running ou stopped",               crit:"Low",  log:"System",  legacy:"N/A",          mitre:"",                      succs:["4688"]},
      {id:"7009", short:"Svc Timeout",   desc:"Timeout de serviço ocorreu",                                crit:"Low",  log:"System",  legacy:"N/A",          mitre:"",                      succs:[]},
      {id:"7023", short:"Svc Error",     desc:"Serviço encerrado com erro específico",                     crit:"Low",  log:"System",  legacy:"N/A",          mitre:"",                      succs:[]},
      {id:"7024", short:"Svc Term Err",  desc:"Serviço encerrado com erro de serviço específico",          crit:"Low",  log:"System",  legacy:"N/A",          mitre:"",                      succs:[]},
      {id:"4698", short:"Task Created",  desc:"Uma tarefa agendada foi criada",                            crit:"Low",  log:"Security",legacy:"N/A",          mitre:"T1053 – Sched. Task",   succs:["4702","4700","4688"]},
      {id:"4699", short:"Task Deleted",  desc:"Uma tarefa agendada foi deletada",                          crit:"Low",  log:"Security",legacy:"N/A",          mitre:"T1053 – Sched. Task",   succs:[]},
      {id:"4700", short:"Task Enabled",  desc:"Uma tarefa agendada foi habilitada",                        crit:"Low",  log:"Security",legacy:"N/A",          mitre:"T1053 – Sched. Task",   succs:["4688"]},
      {id:"4701", short:"Task Disabled", desc:"Uma tarefa agendada foi desabilitada",                      crit:"Low",  log:"Security",legacy:"N/A",          mitre:"",                      succs:[]},
      {id:"4702", short:"Task Updated",  desc:"Uma tarefa agendada foi atualizada",                        crit:"Low",  log:"Security",legacy:"N/A",          mitre:"T1053 – Sched. Task",   succs:["4688"]},
      {id:"4103", short:"PS Module",     desc:"PowerShell executou um pipeline (Module Logging): comandos e parâmetros",crit:"Low", log:"PowerShell/Operational",legacy:"N/A", mitre:"T1059 – Scripting",     succs:[]},
      {id:"4104", short:"PS ScriptBlock",desc:"PowerShell registrou o bloco de script executado (conteúdo já desofuscado)",crit:"Medium",log:"PowerShell/Operational",legacy:"N/A", mitre:"T1059 – Scripting",     succs:[]},
      {id:"903",  short:"App Install",   desc:"Nova instalação de aplicativo detectada",                   crit:"Low",  log:"Application",legacy:"N/A",       mitre:"T1072 – SW Deploy",     succs:["904"]},
      {id:"904",  short:"App Install+",  desc:"Instalação de aplicativo concluída",                       crit:"Low",  log:"Application",legacy:"N/A",       mitre:"",                      succs:[]},
      {id:"1022", short:"MSI Installed", desc:"Novo arquivo MSI instalado",                               crit:"Low",  log:"Application",legacy:"N/A",       mitre:"",                      succs:[]},
      {id:"1033", short:"MSI Complete",  desc:"Instalação MSI concluída",                                 crit:"Low",  log:"Application",legacy:"N/A",       mitre:"",                      succs:[]},
      {id:"19",   short:"WU Installed",  desc:"Windows Update instalado",                                 crit:"Low",  log:"System",  legacy:"N/A",          mitre:"",                      succs:[]},
    ]
  },
  {
    id:"l6", name:"Objetos & Política", color:"#0F6E56",
    desc:"Acesso a arquivos, objetos, registro e alterações de política",
    events:[
      {id:"4656", short:"Handle Req",    desc:"Um handle para um objeto foi solicitado",                   crit:"Low",  log:"Security",legacy:"560",          mitre:"",                      succs:["4663","4658","4660"]},
      {id:"4657", short:"Reg Modified",  desc:"Um valor de registro foi modificado",                      crit:"Low",  log:"Security",legacy:"567",          mitre:"T1112 – Mod Registry",  succs:[]},
      {id:"4658", short:"Handle Closed", desc:"O handle para um objeto foi fechado",                      crit:"Low",  log:"Security",legacy:"562",          mitre:"",                      succs:[]},
      {id:"4659", short:"Handle Del Req",desc:"Handle solicitado com intenção de deletar",                crit:"Low",  log:"Security",legacy:"N/A",          mitre:"",                      succs:["4660"]},
      {id:"4660", short:"Obj Deleted",   desc:"Um objeto foi deletado",                                   crit:"Low",  log:"Security",legacy:"564",          mitre:"",                      succs:[]},
      {id:"4661", short:"Handle Req2",   desc:"Um handle para um objeto foi solicitado",                  crit:"Low",  log:"Security",legacy:"N/A",          mitre:"",                      succs:["4662"]},
      {id:"4662", short:"AD Op Perf",    desc:"Uma operação foi realizada em um objeto AD",               crit:"Low",  log:"Security",legacy:"566",          mitre:"T1530 – Data Local",    succs:["4932","4933"]},
      {id:"4663", short:"Obj Access",    desc:"Tentativa de acessar um objeto",                           crit:"Low",  log:"Security",legacy:"567",          mitre:"T1222 – File Perms",    succs:["4670"]},
      {id:"4664", short:"Hard Link",     desc:"Tentativa de criar um hard link",                          crit:"Low",  log:"Security",legacy:"N/A",          mitre:"",                      succs:[]},
      {id:"5140", short:"Share Access",  desc:"Um compartilhamento de rede foi acessado",                  crit:"Low",  log:"Security",legacy:"N/A",          mitre:"T1021 – Remote Services",succs:["5145"]},
      {id:"5145", short:"Share Obj Chk", desc:"Acesso a arquivo dentro de compartilhamento verificado (detalhado)",crit:"Low",log:"Security",legacy:"N/A",     mitre:"T1021 – Remote Services",succs:["7045","4688"]},
      {id:"4670", short:"Perms Changed", desc:"Permissões em um objeto foram alteradas",                  crit:"Low",  log:"Security",legacy:"N/A",          mitre:"T1078 – Valid Accounts", succs:[]},
      {id:"4673", short:"Priv Svc Call", desc:"Um serviço privilegiado foi chamado",                     crit:"Low",  log:"Security",legacy:"577",          mitre:"",                      succs:[]},
      {id:"4674", short:"Priv Op",       desc:"Operação tentada em um objeto privilegiado",               crit:"Low",  log:"Security",legacy:"578",          mitre:"",                      succs:[]},
      {id:"4703", short:"Token Right",   desc:"Um direito de token foi ajustado",                         crit:"Low",  log:"Security",legacy:"N/A",          mitre:"",                      succs:[]},
      {id:"4704", short:"Right Assign",  desc:"Um direito de usuário foi atribuído",                     crit:"Low",  log:"Security",legacy:"608",          mitre:"",                      succs:[]},
      {id:"4705", short:"Right Remove",  desc:"Um direito de usuário foi removido",                      crit:"Low",  log:"Security",legacy:"609",          mitre:"",                      succs:[]},
      {id:"4715", short:"SACL Changed",  desc:"A política de auditoria (SACL) em um objeto foi alterada",crit:"Medium",log:"Security",legacy:"N/A",         mitre:"",                      succs:[]},
      {id:"4817", short:"Audit Changed", desc:"Configurações de auditoria em objeto foram alteradas",     crit:"Low",  log:"Security",legacy:"N/A",          mitre:"",                      succs:[]},
      {id:"4907", short:"Audit Settings",desc:"Configurações de auditoria em objeto foram alteradas",     crit:"Medium",log:"Security",legacy:"N/A",         mitre:"",                      succs:[]},
      {id:"4719", short:"Audit Policy",  desc:"Política de auditoria do sistema foi alterada",            crit:"High", log:"Security",legacy:"612",          mitre:"T1562 – Impair Def.",   succs:["1102","104"]},
      {id:"6145", short:"GPO Error",     desc:"Erros ao processar política de segurança nos GPOs",        crit:"Medium",log:"Security",legacy:"N/A",         mitre:"",                      succs:[]},
      {id:"1030", short:"GPO No Read",   desc:"Configurações de Política de Grupo não puderam ser lidas",crit:"Low",  log:"System",  legacy:"N/A",          mitre:"",                      succs:[]},
      {id:"1058", short:"Sysvol Fail",   desc:"Computador não conseguiu acessar o compartilhamento Sysvol",crit:"Low", log:"System",  legacy:"N/A",         mitre:"",                      succs:[]},
      {id:"1704", short:"GPO Applied",   desc:"GPO aplicado com sucesso ao computador cliente",           crit:"Low",  log:"System",  legacy:"N/A",          mitre:"",                      succs:[]},
      {id:"4692", short:"DPAPI Backup",  desc:"Backup da chave mestre de proteção de dados foi tentado", crit:"Medium",log:"Security",legacy:"N/A",         mitre:"T1555 – Credentials",   succs:[]},
      {id:"4693", short:"DPAPI Recovery",desc:"Recuperação da chave mestre de proteção de dados tentada",crit:"Medium",log:"Security",legacy:"N/A",         mitre:"T1555 – Credentials",   succs:[]},
      {id:"4906", short:"AuditFail Chg", desc:"Valor CrashOnAuditFail foi alterado",                     crit:"Medium",log:"Security",legacy:"N/A",         mitre:"T1562 – Impair Def.",   succs:[]},
      {id:"4908", short:"Spec Grp Table",desc:"Tabela de logon de grupos especiais foi modificada",       crit:"Medium",log:"Security",legacy:"N/A",         mitre:"",                      succs:[]},
      {id:"4912", short:"Per User Audit",desc:"Política de auditoria por usuário foi alterada",           crit:"Medium",log:"Security",legacy:"807",         mitre:"",                      succs:[]},
    ]
  },
  {
    id:"l7", name:"Auditoria & Rede", color:"#A32D2D",
    desc:"Log de auditoria, firewall, AD replication e certificados",
    events:[
      {id:"1100", short:"Log Svc Down",  desc:"Serviço de log de eventos foi encerrado",                  crit:"High", log:"Security",legacy:"N/A",          mitre:"",                      succs:[]},
      {id:"1101", short:"Audit Drop",    desc:"Eventos de auditoria foram descartados pelo transporte",   crit:"High", log:"Security",legacy:"N/A",          mitre:"",                      succs:[]},
      {id:"1102", short:"Log Cleared",   desc:"O log de auditoria de segurança foi limpo",               crit:"High", log:"Security",legacy:"517",           mitre:"T1070 – Indicator Rmv", succs:[]},
      {id:"104",  short:"Sys Log Clear", desc:"Log de eventos do sistema foi limpo",                     crit:"High", log:"System",  legacy:"N/A",           mitre:"T1070 – Indicator Rmv", succs:[]},
      {id:"1104", short:"Log Full",      desc:"O log de segurança está cheio",                           crit:"Medium",log:"Security",legacy:"N/A",          mitre:"",                      succs:[]},
      {id:"1105", short:"Log Backup",    desc:"Backup automático do log de eventos",                     crit:"Low",  log:"Security",legacy:"N/A",           mitre:"",                      succs:[]},
      {id:"1108", short:"Log Svc Error", desc:"O serviço de log de eventos encontrou um erro",           crit:"Medium",log:"Security",legacy:"N/A",          mitre:"",                      succs:[]},
      {id:"4946", short:"FW Rule+",      desc:"Regra adicionada à lista de exceções do Windows Firewall",crit:"Low",  log:"Security",legacy:"N/A",           mitre:"T1562 – Impair Def.",   succs:[]},
      {id:"4947", short:"FW Rule Chg",   desc:"Regra modificada na lista de exceções do Windows Firewall",crit:"Low", log:"Security",legacy:"N/A",           mitre:"T1562 – Impair Def.",   succs:[]},
      {id:"4948", short:"FW Rule-",      desc:"Regra deletada da lista de exceções do Windows Firewall", crit:"Low",  log:"Security",legacy:"N/A",           mitre:"T1562 – Impair Def.",   succs:[]},
      {id:"4949", short:"FW Reset",      desc:"Configurações do Windows Firewall restauradas para padrão",crit:"Low", log:"Security",legacy:"N/A",           mitre:"",                      succs:[]},
      {id:"4954", short:"FW GPO",        desc:"Configurações de Política de Grupo do Windows Firewall alteradas",crit:"Medium",log:"Security",legacy:"N/A",  mitre:"",                      succs:[]},
      {id:"4956", short:"FW Profile",    desc:"Windows Firewall alterou o perfil ativo",                 crit:"Low",  log:"Security",legacy:"N/A",           mitre:"",                      succs:[]},
      {id:"5027", short:"FW No Policy",  desc:"Serviço do Windows Firewall não conseguiu recuperar a política",crit:"Medium",log:"Security",legacy:"N/A",    mitre:"",                      succs:[]},
      {id:"5030", short:"FW Svc Fail",   desc:"Serviço do Windows Firewall falhou ao iniciar",           crit:"Medium",log:"Security",legacy:"N/A",          mitre:"",                      succs:[]},
      {id:"5035", short:"FW Drv Fail",   desc:"Driver do Windows Firewall falhou ao iniciar",            crit:"Medium",log:"Security",legacy:"N/A",          mitre:"",                      succs:[]},
      {id:"4960", short:"IPsec Int Fail",desc:"IPsec descartou pacote – falha na verificação de integridade",crit:"Medium",log:"Security",legacy:"N/A",      mitre:"",                      succs:[]},
      {id:"4961", short:"IPsec Replay",  desc:"IPsec descartou pacote – falha na verificação de replay", crit:"Medium",log:"Security",legacy:"N/A",          mitre:"",                      succs:[]},
      {id:"4963", short:"IPsec Cleartext",desc:"IPsec descartou pacote cleartext que deveria estar protegido",crit:"Medium",log:"Security",legacy:"N/A",     mitre:"",                      succs:[]},
      {id:"6273", short:"NPS Denied",    desc:"Network Policy Server negou acesso a um usuário",         crit:"Medium",log:"Security",legacy:"N/A",          mitre:"",                      succs:[]},
      {id:"6279", short:"NPS Locked",    desc:"NPS bloqueou conta de usuário por falhas repetidas",      crit:"Medium",log:"Security",legacy:"N/A",          mitre:"",                      succs:[]},
      {id:"4706", short:"Trust Created", desc:"Uma nova relação de confiança foi criada para um domínio",crit:"Medium",log:"Security",legacy:"610",           mitre:"",                      succs:[]},
      {id:"4716", short:"Trust Modified",desc:"Informações de domínio confiável foram modificadas",      crit:"Medium",log:"Security",legacy:"620",           mitre:"",                      succs:[]},
      {id:"4794", short:"DSRM Set",      desc:"Tentativa de definir a senha do Modo de Restauração do DS",crit:"High",log:"Security",legacy:"N/A",           mitre:"",                      succs:[]},
      {id:"4865", short:"Forest Entry+", desc:"Entrada de informação de floresta confiável foi adicionada",crit:"Medium",log:"Security",legacy:"N/A",         mitre:"",                      succs:[]},
      {id:"4928", short:"AD Src NC Est.",desc:"Contexto de nomenclatura de fonte de réplica AD estabelecido",crit:"Low",log:"Security",legacy:"N/A",          mitre:"T1003.006 – DCSync",    succs:["4932"]},
      {id:"4932", short:"AD Repl Begin", desc:"Sincronização de réplica de contexto de nomenclatura AD começou",crit:"Low",log:"Security",legacy:"N/A",       mitre:"T1003.006 – DCSync",    succs:["4933","4934"]},
      {id:"4933", short:"AD Repl End",   desc:"Sincronização de réplica de contexto de nomenclatura AD terminou",crit:"Low",log:"Security",legacy:"N/A",      mitre:"",                      succs:[]},
      {id:"4934", short:"AD Attr Repl",  desc:"Atributos de um objeto AD foram replicados",              crit:"Low",  log:"Security",legacy:"N/A",            mitre:"",                      succs:[]},
      {id:"4935", short:"Repl Fail Bgn", desc:"Início de falha de replicação",                           crit:"Low",  log:"Security",legacy:"N/A",            mitre:"",                      succs:["4936"]},
      {id:"4936", short:"Repl Fail End", desc:"Fim de falha de replicação",                              crit:"Low",  log:"Security",legacy:"N/A",            mitre:"",                      succs:[]},
      {id:"5827", short:"Netlogon Deny", desc:"Netlogon negou conexão vulnerável de conta de máquina",   crit:"Medium",log:"System",  legacy:"N/A",       mitre:"T1210 – Remote Exploit", succs:[]},
      {id:"4868", short:"Cert Denied",   desc:"Gerenciador de certificados negou solicitação pendente",  crit:"Medium",log:"Security",legacy:"772",           mitre:"",                      succs:[]},
      {id:"4870", short:"Cert Revoked",  desc:"Certificate Services revogou um certificado",            crit:"Medium",log:"Security",legacy:"774",            mitre:"",                      succs:[]},
      {id:"4882", short:"CS Perms Chg",  desc:"Permissões de segurança dos Certificate Services foram alteradas",crit:"Medium",log:"Security",legacy:"786",   mitre:"",                      succs:[]},
      {id:"4896", short:"CS Rows Del",   desc:"Linhas deletadas do banco de dados de certificados",      crit:"Medium",log:"Security",legacy:"800",           mitre:"",                      succs:[]},
      {id:"4897", short:"CS Role Sep",   desc:"Separação de função habilitada nos Certificate Services", crit:"High", log:"Security",legacy:"801",            mitre:"",                      succs:[]},
      {id:"5124", short:"OCSP Updated",  desc:"Configuração de segurança atualizada no OCSP Responder Service",crit:"High",log:"Security",legacy:"N/A",       mitre:"",                      succs:[]},
      {id:"4816", short:"RPC Integrity", desc:"RPC detectou violação de integridade ao descriptografar mensagem",crit:"Medium",log:"Security",legacy:"N/A",   mitre:"",                      succs:[]},
      {id:"4621", short:"AuditFail Rcv", desc:"Administrador recuperou sistema do CrashOnAuditFail",       crit:"Medium",log:"Security",legacy:"N/A",         mitre:"",                      succs:[]},
      {id:"4866", short:"Forest Entry-", desc:"Entrada de informação de floresta confiável foi removida",   crit:"Medium",log:"Security",legacy:"N/A",         mitre:"",                      succs:[]},
      {id:"4867", short:"Forest Entry~", desc:"Entrada de informação de floresta confiável foi modificada", crit:"Medium",log:"Security",legacy:"N/A",         mitre:"",                      succs:[]},
      {id:"4885", short:"CS Audit Filt", desc:"Filtro de auditoria dos Certificate Services foi alterado",  crit:"Medium",log:"Security",legacy:"789",         mitre:"",                      succs:[]},
      {id:"4890", short:"CS Mgr Sett",  desc:"Configurações do gerenciador de certificados foram alteradas",crit:"Medium",log:"Security",legacy:"794",         mitre:"",                      succs:[]},
      {id:"4892", short:"CS Prop Chg",  desc:"Uma propriedade dos Certificate Services foi alterada",       crit:"Medium",log:"Security",legacy:"796",         mitre:"",                      succs:[]},
    ]
  },
];


// ══════════════════════════════════════════════════════════════════
// STATUS / RESULT CODES — campos que explicam o "porquê" de cada evento
// sev: n = neutro, w = merece atenção, h = forte indicador
// ══════════════════════════════════════════════════════════════════
const LOGON_TYPES = [
  {c:'2',  m:'Interactive',        n:'Logon no console físico.', sev:'n'},
  {c:'3',  m:'Network',            n:'Acesso a compartilhamento/SMB, WinRM etc. Pass-the-Hash via NTLM aparece aqui.', sev:'n'},
  {c:'4',  m:'Batch',              n:'Tarefa agendada.', sev:'n'},
  {c:'5',  m:'Service',            n:'Serviço iniciado com conta própria.', sev:'n'},
  {c:'7',  m:'Unlock',             n:'Desbloqueio de estação.', sev:'n'},
  {c:'8',  m:'NetworkCleartext',   n:'Senha trafegou em texto claro (ex.: IIS Basic Auth).', sev:'w'},
  {c:'9',  m:'NewCredentials',     n:'runas /netonly. Com Logon Process "seclogo" é o padrão clássico de PtH (sekurlsa::pth).', sev:'h'},
  {c:'10', m:'RemoteInteractive',  n:'RDP. Cruze com IP de origem e horário.', sev:'w'},
  {c:'11', m:'CachedInteractive',  n:'Credencial em cache, sem contato com o DC.', sev:'n'},
];
const NTSTATUS = [
  {c:'0xC000006A', m:'Senha errada (usuário existe)',  n:'Muitas contas diferentes da mesma origem = password spray.', sev:'w'},
  {c:'0xC0000064', m:'Usuário não existe',              n:'Muitos nomes inexistentes = enumeração de usuários.', sev:'w'},
  {c:'0xC0000234', m:'Conta bloqueada',                 n:'Aparece depois do 4740. Tentativas que continuam = ferramenta automatizada.', sev:'h'},
  {c:'0xC0000072', m:'Conta desabilitada',              n:'Uso de conta inativa: credencial antiga ou vazada.', sev:'h'},
  {c:'0xC0000193', m:'Conta expirada',                  n:'Ex-funcionário ou conta temporária ainda em uso.', sev:'w'},
  {c:'0xC0000071', m:'Senha expirada',                  n:'Geralmente operacional.', sev:'n'},
  {c:'0xC0000224', m:'Senha deve ser trocada',          n:'Geralmente operacional.', sev:'n'},
  {c:'0xC000006F', m:'Fora do horário permitido',       n:'Tentativa fora da janela da conta.', sev:'w'},
  {c:'0xC0000070', m:'Estação não autorizada',          n:'Conta usada a partir de máquina não prevista.', sev:'w'},
  {c:'0xC000015B', m:'Tipo de logon não concedido',     n:'Ex.: conta sem direito de RDP tentando Logon Type 10.', sev:'w'},
  {c:'0xC0000133', m:'Relógio fora de sincronia',       n:'Geralmente operacional.', sev:'n'},
  {c:'0xC000006D', m:'Genérico (veja o SubStatus)',     n:'Status "guarda-chuva": o motivo real está no SubStatus.', sev:'n'},
];
const KERB_ERR = [
  {c:'0x0',  m:'Sucesso',                                   n:'', sev:'n'},
  {c:'0x6',  m:'Usuário não existe (C_PRINCIPAL_UNKNOWN)',  n:'Em volume = enumeração de usuários via Kerberos (ex.: kerbrute).', sev:'w'},
  {c:'0xC',  m:'Restrição de política (POLICY)',           n:'Restrição de estação, horário ou exigência de smart card.', sev:'w'},
  {c:'0x12', m:'Conta bloqueada, desabilitada ou expirada', n:'Equivale a vários códigos NTLM ao mesmo tempo.', sev:'h'},
  {c:'0x17', m:'Senha expirada (KEY_EXPIRED)',              n:'Geralmente operacional.', sev:'n'},
  {c:'0x18', m:'Senha errada (PREAUTH_FAILED)',             n:'Muitas contas da mesma origem = password spray via Kerberos.', sev:'w'},
  {c:'0x25', m:'Relógio fora de sincronia (SKEW)',          n:'Geralmente operacional.', sev:'n'},
];
const KERB_ETYPE = [
  {c:'0x11', m:'AES128',          n:'Normal em ambientes modernos.', sev:'n'},
  {c:'0x12', m:'AES256',          n:'Normal em ambientes modernos.', sev:'n'},
  {c:'0x17', m:'RC4-HMAC',        n:'Em ambiente que suporta AES, é forte indicador de roasting (ferramenta pedindo RC4 por ser quebrável offline).', sev:'h'},
  {c:'0x18', m:'RC4-HMAC-EXP',    n:'Legado; suspeito em ambientes modernos.', sev:'w'},
  {c:'0xFFFFFFFF', m:'Falha',     n:'Ticket não emitido.', sev:'n'},
];

const CODES = {
  '4625':[
    {f:'Status / Sub Status', hint:'Status costuma vir genérico (0xC000006D); o motivo real fica no SubStatus.', codes:NTSTATUS},
    {f:'Logon Type', hint:'Qual canal foi tentado.', codes:LOGON_TYPES, collapsed:true},
  ],
  '4624':[
    {f:'Logon Type', hint:'Mesmo usuário, canais diferentes = significados diferentes.', codes:LOGON_TYPES},
  ],
  '4776':[
    {f:'Error Code', hint:'O 4776 é gerado também no sucesso (0x0). Mesmos códigos NTSTATUS do 4625.', codes:[{c:'0x0',m:'Sucesso',n:'',sev:'n'}, ...NTSTATUS.filter(x=>x.c!=='0xC000006D')]},
  ],
  '4771':[
    {f:'Failure Code', hint:'Pré-autenticação falhou. Senha errada no Kerberos cai aqui, não no 4625.', codes:KERB_ERR.filter(x=>['0x12','0x17','0x18','0x25'].includes(x.c))},
  ],
  '4768':[
    {f:'Result Code', hint:'Resultado da emissão do TGT.', codes:KERB_ERR},
    {f:'Pre-Authentication Type', hint:'Como o cliente provou a identidade.', codes:[
      {c:'0',     m:'Sem pré-autenticação', n:'Conta com DONT_REQ_PREAUTH: alvo de AS-REP roasting.', sev:'h'},
      {c:'2',     m:'Senha (PA-ENC-TIMESTAMP)', n:'Padrão.', sev:'n'},
      {c:'15–17', m:'Certificado / smart card (PKINIT)', n:'Esperado onde há smart card ou certificados.', sev:'n'},
    ], collapsed:true},
    {f:'Ticket Encryption Type', hint:'Algoritmo do ticket emitido.', codes:KERB_ETYPE, collapsed:true},
  ],
  '4769':[
    {f:'Ticket Encryption Type', hint:'Chave para detectar Kerberoasting: combine com volume de serviços distintos por conta.', codes:KERB_ETYPE},
    {f:'Failure Code', hint:'Resultado da emissão do TGS.', codes:[KERB_ERR[0]], collapsed:true},
  ],
  '4688':[
    {f:'Token Elevation Type', hint:'Nível de privilégio com que o processo nasceu.', codes:[
      {c:'%%1936', m:'Tipo 1 — token completo', n:'UAC desativado ou conta built-in Administrator.', sev:'w'},
      {c:'%%1937', m:'Tipo 2 — elevado',        n:'"Executar como administrador". Avalie o processo pai.', sev:'w'},
      {c:'%%1938', m:'Tipo 3 — limitado',       n:'Padrão para usuário comum.', sev:'n'},
    ]},
  ],
};

// Matriz NTLM × Kerberos (mesmo motivo, códigos diferentes)
const ROSETTA = [
  {why:'Senha errada',             ntlm:'0xC000006A', ntlmEv:'4625', ntlm2:'0xC000006A', krb:'0x18', krbEv:'4771'},
  {why:'Usuário não existe',       ntlm:'0xC0000064', ntlmEv:'4625', ntlm2:'0xC0000064', krb:'0x6',  krbEv:'4768'},
  {why:'Conta bloqueada',          ntlm:'0xC0000234', ntlmEv:'4625', ntlm2:'0xC0000234', krb:'0x12', krbEv:'4768'},
  {why:'Conta desabilitada',       ntlm:'0xC0000072', ntlmEv:'4625', ntlm2:'0xC0000072', krb:'0x12', krbEv:'4768'},
  {why:'Conta expirada',           ntlm:'0xC0000193', ntlmEv:'4625', ntlm2:'0xC0000193', krb:'0x12', krbEv:'4768'},
  {why:'Senha expirada',           ntlm:'0xC0000071', ntlmEv:'4625', ntlm2:'0xC0000071', krb:'0x17', krbEv:'4771'},
  {why:'Fora do horário',          ntlm:'0xC000006F', ntlmEv:'4625', ntlm2:'0xC000006F', krb:'0xC',  krbEv:'4768'},
  {why:'Estação não autorizada',   ntlm:'0xC0000070', ntlmEv:'4625', ntlm2:'0xC0000070', krb:'0xC',  krbEv:'4768'},
  {why:'Relógio fora de sincronia',ntlm:'0xC0000133', ntlmEv:'4625', ntlm2:'',           krb:'0x25', krbEv:'4771'},
];


// ══════════════════════════════════════════════════════════════════
// ONDE O EVENTO É GERADO
// ══════════════════════════════════════════════════════════════════
const CRIT_NOTE = {
  '4625':'Um 4625 isolado é rotina. A criticidade vem do padrão: volume, variedade de contas, SubStatus e origem.',
  '4624':'Rotina. Ganha peso pelo Logon Type, pela origem e pelo horário — e pelo que vem depois na mesma sessão.',
  '4771':'Isolado é rotina. Falhas 0x18 em muitas contas a partir da mesma origem = password spray.',
  '4769':'Rotina em volume alto. Peso vem do Encryption Type (0x17) e de muitos SPNs distintos por conta em pouco tempo.',
  '4688':'A criticidade depende do processo, da linha de comando e do processo pai, não do evento em si.',
  '4776':'Gerado também no sucesso. Avalie o Error Code e o volume por origem.',
  '4662':'Volume alto e genérico. Ganha peso com GUIDs específicos em Properties (ex.: replicação = DCSync).',
};
const SRC_LABEL = {
  dc:     {tag:'DC',        txt:'Controlador de domínio'},
  dclocal:{tag:'DC / host', txt:'DC para contas de domínio; o próprio host para contas locais'},
  target: {tag:'Destino',   txt:'Host acessado (destino do logon/ação)'},
  origin: {tag:'Origem',    txt:'Host de onde a credencial foi usada (origem)'},
  host:   {tag:'Host',      txt:'Host onde a ação ocorreu'},
  ca:     {tag:'CA',        txt:'Servidor da autoridade certificadora (AD CS)'},
  nps:    {tag:'NPS',       txt:'Servidor NPS/RADIUS'},
};
const SRC = {};
const setSrc=(k,ids)=>ids.forEach(i=>SRC[i]=k);
setSrc('dc',['5136','4768','4769','4770','4771','4772','4773','4820','4821','4822','4823','4824','4727','4728','4729','4730','4737','4754','4755','4756','4757','4758','4764','4765','4766','4780','4741','4742','4743','4739','4713','4706','4716','4794','4865','4866','4867','4662','4928','4932','4933','4934','4935','4936','5827','4675']);
setSrc('dclocal',['4776','4777','4740','4767','4720','4722','4723','4724','4725','4726','4738','4781','4782','4793','4797']);
setSrc('target',['1149','4624','4625','4634','4647','4672','4964','4778','4779','4825','4626','4627','5140','5145']);
setSrc('origin',['4648']);
setSrc('ca',['4868','4870','4882','4885','4890','4892','4896','4897','5124']);
setSrc('nps',['6273','6279']);
// demais: host onde ocorreu

// ══════════════════════════════════════════════════════════════════
// PRÉ-REQUISITO: subcategoria da Advanced Audit Policy (ou equivalente)
// ══════════════════════════════════════════════════════════════════
const AUDIT = {};
const setAud=(t,ids)=>ids.forEach(i=>AUDIT[i]=t);
const ALWAYS='Sempre registrado (não depende da política de auditoria)';
setAud(ALWAYS+' — log System/Application do próprio componente',['41','12','13','6005','6006','6008','6009','6013','1074','7045','7000','7036','7009','7023','7024','903','904','1022','1033','19','1030','1058','1704','104','5827']);
setAud(ALWAYS+' — serviço de log de eventos',['1100','1101','1102','1104','1105','1108']);
setAud('System › Security State Change',['4608','4609','4621']);
setAud('System › Security System Extension',['4610','4611','4614','4622','4697']);
setAud('System › System Integrity',['4618','4816']);
setAud('System › IPsec Driver',['4960','4961','4963']);
setAud('System › Other System Events',['5027','5030','5035']);
setAud('Logon/Logoff › Logon',['4624','4625','4648']);
setAud('Logon/Logoff › Logoff',['4634','4647']);
setAud('Logon/Logoff › Special Logon',['4672','4964']);
setAud('Logon/Logoff › Other Logon/Logoff Events',['4649','4778','4779','4800','4801','4802','4803']);
setAud('Logon/Logoff › User / Device Claims',['4626']);
setAud('Logon/Logoff › Group Membership',['4627']);
setAud('Logon/Logoff › Network Policy Server',['6273','6279']);
setAud('Account Logon › Kerberos Authentication Service',['4768','4771','4772']);
setAud('Account Logon › Kerberos Service Ticket Operations',['4769','4770','4773']);
setAud('Account Logon › Credential Validation',['4774','4775','4776','4777']);
setAud('Account Management › User Account Management',['4720','4722','4723','4724','4725','4726','4738','4740','4765','4766','4767','4780','4781','4794','4797','4798']);
setAud('Account Management › Security Group Management',['4727','4728','4729','4730','4731','4732','4733','4734','4735','4737','4754','4755','4756','4757','4758','4764','4799']);
setAud('Account Management › Computer Account Management',['4741','4742','4743']);
setAud('Account Management › Other Account Management Events',['4782','4793']);
setAud('Detailed Tracking › Process Creation (linha de comando exige a GPO "Include command line in process creation events")',['4688','4696']);
setAud('Detailed Tracking › Process Termination',['4689']);
setAud('Detailed Tracking › DPAPI Activity',['4692','4693']);
setAud('Object Access › Handle Manipulation',['4690']);
setAud('Object Access › Other Object Access Events',['4698','4699','4700','4701','4702']);
setAud('Object Access › File System ou Registry (conforme o objeto) + SACL no objeto',['4656','4658','4660','4663']);
setAud('Object Access › File System + SACL no objeto',['4659','4664']);
setAud('Object Access › Registry + SACL na chave',['4657']);
setAud('Object Access › SAM',['4661']);
setAud('Object Access › File Share',['5140']);
setAud('Object Access › Detailed File Share (volume muito alto: habilite com critério)',['5145']);
setAud('Object Access › Certification Services',['4868','4870','4882','4885','4890','4892','4896','4897','5124']);
setAud('DS Access › Directory Service Access + SACL no objeto do AD',['4662']);
setAud('DS Access › Directory Service Replication',['4932','4933']);
setAud('DS Access › Detailed Directory Service Replication',['4928','4934','4935','4936']);
setAud('Privilege Use › Sensitive / Non Sensitive Privilege Use',['4673','4674']);
setAud('Policy Change › Audit Policy Change',['4715','4719','4817','4906','4907','4908','4912']);
setAud('Policy Change › Authentication Policy Change',['4706','4713','4716','4739','4865','4866','4867']);
setAud('Policy Change › Authorization Policy Change',['4670','4703','4704','4705']);
setAud('Policy Change › MPSSVC Rule-Level Policy Change',['4946','4947','4948','4949','4954','4956']);
setAud('Policy Change › Other Policy Change Events',['4714','4826']);
setAud('DS Access › Directory Service Changes + SACL cobrindo o atributo/objeto',['5136']);
setAud(ALWAYS+' — log operacional do RDP (habilitado por padrão)',['1149']);
setAud('GPO: Turn on PowerShell Script Block Logging (sem a GPO, o Windows ainda registra blocos considerados suspeitos)',['4104']);
setAud('GPO: Turn on Module Logging (definir quais módulos)',['4103']);

// ══════════════════════════════════════════════════════════════════
// CAMPOS DE CORRELAÇÃO — como provar a aresta numa busca
// ══════════════════════════════════════════════════════════════════
const LID='TargetLogonId (4624) = SubjectLogonId';
const KEYS = {
  '4624-4672':LID, '4624-4688':LID, '4624-4648':LID, '4624-5140':LID+' (Logon Type 3)',
  '4624-4634':'TargetLogonId = TargetLogonId',
  '4672-4688':'SubjectLogonId = SubjectLogonId',
  '4688-4689':'NewProcessId (4688) = ProcessId (4689)',
  '4688-4656':'NewProcessId (4688) = ProcessId', '4688-4663':'NewProcessId (4688) = ProcessId',
  '4688-4697':'SubjectLogonId', '4688-4698':'SubjectLogonId',
  '4688-4104':'NewProcessId (4688, hexadecimal) = Execution ProcessID (4104, decimal) — converta antes de comparar',
  '4656-4663':'HandleId + ProcessId', '4663-4658':'HandleId + ProcessId', '4656-4658':'HandleId + ProcessId',
  '4625-4740':'TargetUserName — no 4740, Caller Computer Name indica a máquina de origem do bloqueio',
  '4625-4624':'TargetUserName + IpAddress',
  '4740-4767':'TargetUserName', '4767-4624':'TargetUserName', '4740-4625':'TargetUserName',
  '4768-4769':'Conta + IpAddress (não existe ID comum entre TGT e TGS)',
  '4771-4768':'TargetUserName + IpAddress', '4771-4625':'TargetUserName + IpAddress',
  '4776-4624':'TargetUserName + Workstation (4776) = WorkstationName (4624)',
  '4776-4625':'TargetUserName + Workstation (4776) = WorkstationName (4625)',
  '4697-7045':'ServiceName', '4698-4700':'TaskName', '4698-4702':'TaskName', '4700-4702':'TaskName', '4698-4688':'TaskName → processo filho de svchost (Schedule)',
  '4720-4722':'TargetSid', '4720-4728':'TargetSid (4720) = MemberSid', '4720-4732':'TargetSid (4720) = MemberSid',
  '1149-4624':'IP de origem + conta (o 1149 não traz Logon ID)',
  '5140-5145':'SubjectLogonId + ShareName', '5145-7045':'Host de destino + RelativeTargetName (5145) = ImagePath (7045)',
  '5145-4688':'RelativeTargetName (5145) ≈ NewProcessName (4688)',
};


// ══════════════════════════════════════════════════════════════════
// LEITURA ADVERSARIAL — sempre ancorada no log: o atacante aparece
// apenas como causa de uma variação na telemetria
// req: componentes obrigatórios | vary: o que muda no log
// choke: o que sobrevive às variações | blind: o que o log nativo não vê
// ══════════════════════════════════════════════════════════════════
const ADV = {
  'brute-force':{
    req:'Enviar muitas tentativas de senha para a mesma conta até acertar.',
    vary:[
      'Tentativas via Kerberos em vez de NTLM: as falhas aparecem como 4771 (0x18) no DC, não como 4625 no host.',
      'Com política de bloqueio, o excesso de falhas gera 4740 (conta bloqueada) — muitas vezes é o próprio usuário bloqueado que abre o chamado.',
      'Ritmo lento, abaixo do limite de bloqueio: não há 4740 — só 4625 espaçados ao longo de horas.',
      'Origens distribuídas (vários IPs): o volume por IP cai, mas o volume por conta continua alto.'],
    choke:'Muitas falhas contra a mesma conta numa janela, somando 4625, 4771 e 4776 por TargetUserName — independente de IP e protocolo.',
    blind:['Quebra offline de um hash já obtido não gera evento de autenticação.','Tentativas contra serviços com log próprio (VPN, webmail) ficam fora do log do Windows.']},
  'pass-the-hash':{
    req:'Ter o hash NTLM da conta e autenticar com ele no lugar da senha.',
    vary:[
      'Hash convertido em TGT Kerberos (overpass-the-hash): em vez de NTLM, aparece 4768 com Encryption Type 0x17 (RC4) onde o normal do ambiente é AES.',
      'Execução por WMI, WinRM ou tarefa em vez de serviço: 7045/4697 somem; aparece 4688 com pai wmiprvse.exe ou wsmprovhost.exe, ou um 4698.',
      'Ferramenta que autentica direto pela rede, sem criar sessão local: não há 4624 Type 9 na origem — sobram o DC e o destino.'],
    choke:'Credencial administrativa usada num par conta × host incomum (ex.: de estação de usuário para servidor), seguida de execução remota no destino. O protocolo varia; o uso da credencial fora do padrão, não.',
    blind:['A obtenção do hash (leitura da memória do LSASS) não aparece no log nativo sem SACL no processo — é visão de Sysmon (evento 10) ou EDR.']},
  'kerberoasting':{
    req:'Uma conta qualquer do domínio pede tickets de serviço (TGS) de contas com SPN e quebra a senha offline.',
    vary:[
      'Ticket pedido em AES em vez de RC4: o 0x17 some (a quebra fica bem mais lenta, mas possível).',
      'Um ticket por vez, espaçado no tempo: o volume por janela cai — é preciso olhar SPNs distintos por conta ao longo de dias.',
      'Um único alvo escolhido a dedo: pode ser um só 4769, indistinguível do normal sem contexto.'],
    choke:'Conta pedindo ticket para serviço que nunca usou (par conta × SPN inédito). Reforço clássico: uma conta de serviço isca (honey SPN) — qualquer 4769 para ela é suspeito.',
    blind:['A quebra da senha acontece fora do ambiente: nenhum evento. O próximo sinal só surge quando a conta quebrada for usada.']},
  'dcsync':{
    req:'Uma conta com os direitos de replicação (Get-Changes e Get-Changes-All) pede os segredos ao DC pelo protocolo de replicação.',
    vary:[
      'Uso de conta de computador de um DC comprometido: o critério "a conta não é de DC" falha; resta o critério de origem (IP que não é de DC).',
      'Direito de replicação concedido a uma conta comum antes do ataque: a preparação aparece como 5136 na ACL do domínio (evento ainda não incluído no grafo).'],
    choke:'Pedido de replicação (4662 com os GUIDs de replicação) vindo de uma origem que não é DC.',
    blind:['O 4662 só existe com SACL no objeto do domínio; sem ela, a técnica não deixa rastro no log Security.','O 4662 não traz IP: a origem vem do 4624 com o mesmo Logon ID.']},
  'persistence-task':{
    req:'Registrar algo que volte a executar sem ação do atacante.',
    vary:[
      'Tarefa criada por API (PowerShell, COM) em vez de schtasks.exe: a linha de comando no 4688 muda, mas o 4698 continua.',
      'Alteração de uma tarefa legítima já existente em vez de criar uma nova: não há 4698; aparece 4702 (tarefa atualizada).',
      'Outro mecanismo de persistência: a telemetria migra para 7045/4697 (serviço), 4657 (chave Run, com SACL) ou para o log WMI-Activity (assinatura WMI).',
      'Nome e caminho imitando tarefas do Windows: o nome parece legítimo, mas o conteúdo (TaskContent) denuncia.'],
    choke:'A ação da tarefa: binário fora dos caminhos esperados ou interpretador com argumentos (powershell -enc, cmd /c, rundll32).',
    blind:['Sem a subcategoria Other Object Access Events, a criação da tarefa não é registrada.']},
  'cover-tracks':{
    req:'Reduzir ou apagar o registro do que foi feito.',
    vary:[
      'Desligar só algumas subcategorias (auditpol) em vez de limpar o log: aparece 4719, não 1102.',
      'Parar o serviço de log: aparece 1100, ou simplesmente uma lacuna.',
      'Remover eventos específicos em vez do log inteiro: não há 1102; o sinal é um salto na sequência do EventRecordID.'],
    choke:'O SIEM: o que já foi encaminhado não pode ser apagado no host. Silêncio repentino de um host que normalmente gera eventos é o sinal.',
    blind:['Ações com privilégio de kernel podem suprimir eventos sem gerar registro — só a ausência denuncia.']},
  'ransomware-obj':{
    req:'Ler, cifrar e regravar muitos arquivos rapidamente — e impedir a recuperação.',
    vary:[
      'Cifragem local, no próprio servidor, em vez de pela rede: no lugar do 5145 aparecem 4663 de escrita (com SACL) e talvez 4660.',
      'Cópias de sombra apagadas de outro jeito (WMI, PowerShell) ou não apagadas: o 4688 de vssadmin some.',
      'Execução a partir de várias estações ao mesmo tempo: o volume por sessão cai, mas o volume total no servidor de arquivos dispara.'],
    choke:'Uma sessão tocando um volume anormal de arquivos distintos em pouco tempo no servidor de arquivos — e a exclusão de cópias de sombra como preparação.',
    blind:['O 5145 em massa exige Detailed File Share, que muitos ambientes não habilitam pelo volume. Sem ele, o sinal vem do 4688 (vssadmin) na estação ou do EDR.']},
  'lateral-psexec':{
    req:'Copiar algo para o alvo e fazê-lo executar remotamente com credencial válida.',
    vary:[
      'Nome de serviço e binário customizados: "PSEXESVC" some, mas o padrão 5145 (gravação de .exe em ADMIN$) → 7045 continua.',
      'Execução via WMI ou WinRM: sem 5145 e 7045; aparece 4688 com pai wmiprvse.exe ou wsmprovhost.exe.',
      'Serviço apontando direto para um comando, sem copiar binário: sem 5145; o 7045 traz ImagePath com cmd.exe /c ou powershell.'],
    choke:'No destino: logon de rede de conta administrativa seguido, em segundos, de execução (7045, 4698 ou filho de wmiprvse/wsmprovhost) na mesma sessão.',
    blind:['O 5145 exige Detailed File Share, caro e muitas vezes desligado. Sem ele, perde-se o passo da cópia.']},
  'password-spray':{
    req:'Testar poucas senhas comuns contra muitas contas, ficando abaixo do limite de bloqueio.',
    vary:['Via NTLM em vez de Kerberos: as falhas aparecem como 4625 (0xC000006A) no host ou 4776 no DC, e não como 4771.',
      'Contra serviços expostos (webmail, VPN, nuvem): as falhas ficam nos logs desses serviços, não no Windows.',
      'Ritmo muito lento e IPs rotativos: cai o volume por IP e por hora; a variedade de contas por origem ao longo do dia continua.',
      'Sucesso via NTLM em vez de Kerberos: no lugar do 4768 aparece um 4624 direto no host, com 4776 no DC.',
      'Contas inexistentes na lista do atacante: aparecem 4768 com 0x6 (ou 4625 com 0xC0000064) misturados às falhas de senha.'],
    choke:'Uma origem falhando contra muitas contas distintas — conte contas distintas por origem, não tentativas. É o inverso da métrica do brute force.',
    blind:['O log não registra a senha tentada: "a mesma senha em várias contas" é inferido pelo padrão, não visto.']},
  'asrep-roast':{
    req:'Pedir o TGT de contas sem pré-autenticação e quebrar offline a parte cifrada com a senha.',
    vary:['Ticket pedido em AES: o Encryption Type deixa de ser 0x17, mas o Pre-Authentication Type 0 continua.',
      'Se o atacante tiver direitos sobre uma conta protegida, ele mesmo desliga a pré-autenticação antes: aparece um 4738 alterando UserAccountControl (AS-REP roasting direcionado).'],
    choke:'Pre-Authentication Type 0 no 4768. Em ambiente bem configurado quase nenhuma conta gera isso: dá para listar as contas com essa configuração e monitorar só elas.',
    blind:['A quebra é offline: nenhum evento até a conta ser usada.']},
  'silver-ticket':{
    req:'Com o hash da conta de serviço, forjar um ticket de serviço e apresentá-lo direto ao servidor, sem passar pelo DC.',
    vary:['Alvo é a própria conta de computador (serviços CIFS, HOST): o acesso parece tráfego normal da máquina.',
      'Ferramentas podem preencher campos do ticket de forma inconsistente: o 4624 pode trazer domínio em formato incomum ou conta que não existe no AD.'],
    choke:'Logon Kerberos no servidor (4624) sem nenhum 4769 correspondente, para aquele serviço, em nenhum DC. É um sinal por ausência: exige juntar o log do servidor com o de todos os DCs.',
    blind:['O DC não vê nada — por isso não há 4768/4769. Sem coleta do servidor-alvo, a técnica é invisível.',
      'A validação do PAC junto ao DC, que denunciaria a falsificação, em geral não acontece para serviços que rodam como sistema.']},
  'backdoor-account':{
    req:'Criar ou reativar uma conta e garantir privilégio para ela.',
    vary:['Reativar conta antiga desabilitada em vez de criar: sem 4720; aparece 4722 (e talvez 4724 de reset de senha).',
      'Privilégio por grupo aninhado (incluir num grupo que já é membro de Domain Admins): o 4728 aparece no grupo intermediário, não no Domain Admins.',
      'Privilégio por ACL em vez de grupo: sem 4728/4732; aparece 5136 alterando nTSecurityDescriptor.'],
    choke:'Mudança na composição efetiva dos grupos privilegiados, aninhamento incluído. Monitore os membros efetivos, não só eventos no grupo principal.',
    blind:['Contas locais criadas em hosts sem coleta passam despercebidas: o evento fica só no próprio host.']},
  'lateral-rdp':{
    req:'Abrir sessão interativa remota no alvo com credencial válida.',
    vary:['Reconexão a sessão já existente: em vez de novo logon Type 10, aparece 4778 (com 4624 Type 7).',
      'RDP por túnel (SSH, proxy): o IP de origem no 1149/4624 vira 127.0.0.1 ou o IP do pivô, não o da máquina real.',
      'Restricted Admin ou Remote Credential Guard: a senha não vai ao alvo; o 4624 mostra Restricted Admin Mode = Yes.'],
    choke:'Logon Type 10 (ou 1149) num par conta × host × origem fora do baseline.',
    blind:['O que acontece dentro da sessão gráfica não é registrado; só os processos iniciados (4688).']},
  'lateral-wmi':{
    req:'Executar comando no alvo pela infraestrutura de gerenciamento remoto, com credencial válida.',
    vary:['WinRM em vez de WMI: o processo pai passa a ser wsmprovhost.exe; o padrão logon de rede → processo filho continua.',
      'Comando em PowerShell: o conteúdo aparece no 4104 do alvo, desofuscado, mesmo que tenha saído ofuscado da origem.',
      'Assinatura WMI permanente em vez de execução direta: aparece no log WMI-Activity (5861), não como processo filho imediato.'],
    choke:'No destino, wmiprvse.exe (ou wsmprovhost.exe) gerando shell ou interpretador (cmd, powershell) logo após um logon de rede.',
    blind:['Os parâmetros da chamada WMI não ficam no log Security; só o processo resultante.']},
  'local-recon':{
    req:'Descobrir contas, grupos e privilégios do host para planejar o próximo passo.',
    vary:['Consulta por API (PowerShell, .NET, ferramenta própria) em vez de net.exe: o 4688 de net.exe some, mas o 4798/4799 continua — com outro CallerProcessName.',
      'Consulta só ao próprio token (whoami /all): não gera 4798/4799; fica apenas o 4688.'],
    choke:'Um processo de usuário enumerando vários grupos e contas em sequência rápida: volume e variedade por CallerProcessName, não o evento isolado.',
    blind:['O 4799 tem muito ruído legítimo (serviços e agentes consultam o grupo Administradores o tempo todo); sem baseline de CallerProcessName, o sinal se perde.']},
  'shadow-creds':{
    req:'Gravar uma chave própria no atributo msDS-KeyCredentialLink da conta alvo e usá-la para pedir TGT por certificado (PKINIT).',
    vary:['Em ambiente com Windows Hello for Business, gravações legítimas nesse atributo são comuns: o sinal passa a ser quem gravou.',
      'Alvo é conta de computador: o TGT obtido é da máquina, e o uso seguinte parece tráfego normal de host.'],
    choke:'5136 em msDS-KeyCredentialLink feito por conta inesperada, seguido de 4768 com Pre-Authentication Type de certificado para a conta alvo.',
    blind:['O 5136 só existe com Directory Service Changes habilitado e SACL cobrindo o atributo — muitas configurações padrão não cobrem.']},
};

// ══════════════════════════════════════════════════════════════════
// INDEX
// ══════════════════════════════════════════════════════════════════
const evtMap = {};
LAYERS.forEach(l=>l.events.forEach(ev=>{evtMap[ev.id]={...ev,layer:l.id,layerName:l.name,layerColor:l.color};}));

// build predecessor index from successors
const predMap = {};
LAYERS.forEach(l=>l.events.forEach(ev=>{
  (ev.succs||[]).forEach(sid=>{
    if(!predMap[sid]) predMap[sid]=[];
    predMap[sid].push(ev.id);
  });
}));


// ══════════════════════════════════════════════════════════════════
// CENÁRIOS
// ══════════════════════════════════════════════════════════════════
const SCENARIOS = [
  {
    id:'brute-force', name:'Brute Force → Acesso', color:'#A32D2D', mitre:'T1110.001',
    steps:['4625','4625','4624','4672','4688'],
    hosts:['target','target','target','target','host'],
    notes:['SubStatus 0xC000006A: usuário existe, senha errada','Dezenas de falhas na mesma conta, da mesma origem, em poucos minutos','Sucesso vindo do mesmo IP das falhas — a senha foi descoberta','Conta com privilégios especiais','Primeira ação após o acesso'],
    desc:'Muitas tentativas de senha contra uma mesma conta até acertar, antes que algum limite de bloqueio seja atingido (ou num ambiente sem bloqueio configurado).'
  },
  {
    id:'pass-the-hash', name:'Pass-the-Hash', color:'#854F0B', mitre:'T1550.002',
    steps:['4624','4776','4624','4672','4697','7045','4688'],
    hosts:['origin','dc','target','target','target','target','target'],
    notes:['Logon Type 9, Logon Process seclogo (sekurlsa::pth)','Validação NTLM da conta usada (conta de domínio)','Logon Type 3, Authentication Package NTLM','Conta administrativa no alvo','Serviço instalado (log Security)','Mesmo serviço no log System','Processo filho de services.exe'],
    desc:'O hash é injetado numa sessão na origem e usado via NTLM para logon de rede no alvo, seguido de execução remota por serviço. Os eventos se dividem entre origem, DC e destino.'
  },
  {
    id:'kerberoasting', name:'Kerberoasting', color:'#533489', mitre:'T1558.003',
    steps:['4768','4769','4769','4624','4688'],
    hosts:['dc','dc','dc','target','host'],
    notes:['TGT da conta comprometida (pode ter sido emitido horas antes, no logon normal)','TGS com Ticket Encryption Type 0x17 (RC4)','Vários SPNs distintos em poucos segundos','Após quebra offline (sem telemetria), logon com a conta de serviço','Uso da conta de serviço'],
    desc:'Com uma conta qualquer do domínio, o atacante pede tickets de serviço (de preferência RC4) para quebrar a senha das contas de serviço offline.'
  },
  {
    id:'dcsync', name:'DCSync', color:'#185FA5', mitre:'T1003.006',
    steps:['4624','4672','4662'],
    hosts:['dc','dc','dc'],
    notes:['Logon Type 3 no DC a partir de host que não é DC','Conta com privilégio de replicação','Properties com 1131f6aa-… / 1131f6ad-… (DS-Replication-Get-Changes[-All]) vindo de conta que não é de DC'],
    desc:'Conta com direito de replicação pede ao DC, via DRSUAPI, os segredos das contas. O sinal está no 4662 com os GUIDs de replicação; replicação legítima vem só de contas de computador de DCs.'
  },
  {
    id:'persistence-task', name:'Persistência via Task', color:'#0F6E56', mitre:'T1053.005',
    steps:['4624','4688','4698','4688'],
    hosts:['target','host','host','host'],
    notes:['Acesso ao servidor','schtasks.exe /create (ou PowerShell) — linha de comando no 4688','Tarefa criada: o XML em TaskContent mostra a ação e o horário','Execução disparada pelo horário: processo filho do serviço de tarefas'],
    desc:'Após o acesso, uma tarefa agendada é criada para executar de novo, sozinha, em horário definido.'
  },
  {
    id:'cover-tracks', name:'Cobertura de Rastros', color:'#5F5E5A', mitre:'T1070.001',
    steps:['4688','1102','104'],
    hosts:['host','host','host'],
    notes:['wevtutil cl, Clear-EventLog ou o próprio Visualizador de Eventos','Log Security limpo — o 1102 é gerado sempre, mesmo com a auditoria desligada','Log System limpo'],
    desc:'Os logs locais são apagados para esconder o que aconteceu antes. O que já tinha sido enviado ao SIEM continua lá.'
  },
  {
    id:'ransomware-obj', name:'Ransomware em compartilhamento', color:'#A32D2D', mitre:'T1486',
    steps:['4688','4688','4624','5140','5145'],
    hosts:['origin','origin','target','target','target'],
    notes:['Binário executado na estação infectada','vssadmin delete shadows (ou wmic shadowcopy delete): preparação para impedir a recuperação','Logon de rede no servidor de arquivos','Acesso ao compartilhamento do departamento','5145 em massa: milhares de arquivos tocados pela mesma sessão em minutos'],
    desc:'Uma estação infectada cifra os arquivos do servidor pela rede, através do compartilhamento. É o padrão mais comum: o servidor sofre, mas o processo malicioso roda em outra máquina.'
  },
  {
    id:'lateral-psexec', name:'Movimento lateral (PsExec)', color:'#993C1D', mitre:'T1021.002',
    steps:['4624','5140','5145','7045','4688'],
    hosts:['target','target','target','target','target'],
    notes:['Logon Type 3 vindo da origem','Acesso a ADMIN$','Gravação de PSEXESVC.exe (ou similar)','Serviço criado','Comando executado como filho do serviço'],
    desc:'Logon de rede no alvo, acesso ao ADMIN$, cópia do binário, criação de serviço e execução — tudo no host de destino.'
  },
  {
    id:'password-spray', name:'Password Spray', color:'#A32D2D', mitre:'T1110.003',
    steps:['4771','4771','4768','4624'],
    hosts:['dc','dc','dc','target'],
    keys:{'4771-4768':'IpAddress — no spray a conta muda a cada tentativa; o que une os eventos é a origem, não o usuário'},
    notes:['0x18 para a conta A','0x18 para as contas B, C, D… — mesma origem, mesma janela, uma ou duas tentativas por conta','Sucesso: TGT emitido para uma conta com senha fraca, da mesma origem','Uso da conta comprometida'],
    desc:'Poucas senhas comuns testadas contra muitas contas, abaixo do limite de bloqueio. É o inverso do brute force: muitas contas, poucas tentativas por conta.'
  },
  {
    id:'asrep-roast', name:'AS-REP Roasting', color:'#533489', mitre:'T1558.004',
    steps:['4768','4624','4688'],
    hosts:['dc','target','host'],
    notes:['Pre-Authentication Type 0 e Encryption Type 0x17, pedido de uma origem incomum para a conta','Após quebra offline (sem telemetria), logon com a conta','Uso da conta comprometida'],
    desc:'Contas configuradas sem pré-autenticação Kerberos devolvem um TGT que qualquer um pode pedir e tentar quebrar offline.'
  },
  {
    id:'silver-ticket', name:'Silver Ticket', color:'#5F5E5A', mitre:'T1558.002',
    steps:['4624','4672','4688'],
    hosts:['target','target','host'],
    notes:['Logon com Authentication Package Kerberos — sem nenhum 4769 correspondente em qualquer DC','Privilégios atribuídos pelo PAC forjado','Uso do acesso'],
    desc:'Com o hash da conta de serviço, o ticket de serviço é forjado e apresentado direto ao servidor. O DC nunca participa: o sinal é a ausência do 4769.'
  },
  {
    id:'backdoor-account', name:'Conta backdoor', color:'#854F0B', mitre:'T1136.002',
    steps:['4720','4722','4728','4624','4672'],
    hosts:['dclocal','dclocal','dc','target','target'],
    notes:['Conta criada','Conta habilitada','Inclusão em grupo privilegiado (global); em grupo local seria 4732, universal 4756','Primeiro logon da conta nova','Privilégios especiais na sessão'],
    desc:'Criação de conta e concessão de privilégio para garantir acesso futuro.'
  },
  {
    id:'lateral-rdp', name:'Movimento lateral (RDP)', color:'#185FA5', mitre:'T1021.001',
    steps:['4688','4648','1149','4624','4672','4779'],
    hosts:['origin','origin','target','target','target','target'],
    notes:['mstsc.exe na origem','Credenciais explícitas para TERMSRV/alvo','Autenticação RDP com IP de origem','Logon Type 10 (RemoteInteractive)','Conta administrativa','Desconexão da sessão'],
    desc:'Sessão interativa remota no alvo. Origem e destino deixam rastros diferentes — ver os dois lados é o que fecha a história.'
  },
  {
    id:'lateral-wmi', name:'Movimento lateral (WMI)', color:'#0F6E56', mitre:'T1047',
    steps:['4688','4624','4688'],
    hosts:['origin','target','target'],
    notes:['wmic.exe /node:… ou ferramenta equivalente na origem','Logon Type 3 no destino','cmd.exe filho de wmiprvse.exe — às vezes com a saída redirecionada para um arquivo em ADMIN$'],
    desc:'Execução remota pela infraestrutura de gerenciamento do Windows, sem copiar arquivo nem criar serviço.'
  },
  {
    id:'local-recon', name:'Reconhecimento local', color:'#888780', mitre:'T1087.001',
    steps:['4688','4798','4799'],
    hosts:['host','host','host'],
    notes:['net.exe, whoami, PowerShell','Grupos de um usuário enumerados — CallerProcessName mostra quem perguntou','Grupo local com segurança enumerado (ex.: Administradores)'],
    desc:'Descoberta de contas, grupos e privilégios do host para planejar o próximo passo.'
  },
  {
    id:'shadow-creds', name:'Shadow Credentials', color:'#993556', mitre:'T1098',
    steps:['5136','4768','4624'],
    hosts:['dc','dc','target'],
    notes:['AttributeLDAPDisplayName = msDS-KeyCredentialLink, gravado por conta inesperada','TGT por certificado (Pre-Authentication Type 15–17) para a conta alvo','Logon como a conta alvo'],
    desc:'Uma chave do atacante é gravada na conta alvo, permitindo pedir TGT por certificado em nome dela sem conhecer a senha.'
  },
];

// ══════════════════════════════════════════════════════════════════
// JANELAS DE TEMPO ENTRE EVENTOS
// ai: como a janela muda quando a sequência é executada por um agente de IA.
// Observações iniciais (casos públicos de 2025–2026); automação sem IA também é rápida —
// o que distingue o agente é velocidade + adaptação (refaz com variação após falhar).
// ══════════════════════════════════════════════════════════════════
const TIMING = {
  // CAMADA 1 — Sistema
  '12-6005':   {label:'< 100 ms',  cls:'t-instant',  note:'Kernel inicia o serviço de log imediatamente após registrar o boot.',                                   anomaly:'Intervalo > 5s indica problema no serviço de log ou inicialização lenta.'},
  '12-4608':   {label:'< 500 ms',  cls:'t-instant',  note:'Windows Starting é gerado pela LSA logo após o kernel registrar o boot.',                               anomaly:''},
  '6005-4608': {label:'< 200 ms',  cls:'t-instant',  note:'Praticamente simultâneos — fazem parte da mesma sequência de inicialização.',                          anomaly:''},
  '4608-4610': {label:'< 1 s',     cls:'t-instant',  note:'Pacotes de autenticação são carregados imediatamente durante a inicialização da LSA.',                  anomaly:''},
  '4610-4611': {label:'< 500 ms',  cls:'t-instant',  note:'Processo de logon registrado logo após os pacotes de autenticação.',                                    anomaly:''},
  '4611-4614': {label:'< 500 ms',  cls:'t-instant',  note:'Pacote de notificação do SAM carregado na sequência de inicialização.',                                 anomaly:''},
  '4614-4622': {label:'< 500 ms',  cls:'t-instant',  note:'Pacotes de segurança adicionais carregados logo após o SAM.',                                           anomaly:''},
  '13-6006':   {label:'< 200 ms',  cls:'t-instant',  note:'Kernel registra shutdown e o serviço de log encerra imediatamente.',                                    anomaly:''},
  '6006-4609': {label:'< 200 ms',  cls:'t-instant',  note:'Windows Shutting Down gerado imediatamente após o serviço de log encerrar.',                            anomaly:''},
  '1074-4609': {label:'< 5 s',     cls:'t-seconds',  note:'Após o usuário ou processo solicitar shutdown, o SO registra o encerramento em poucos segundos.',       anomaly:''},
  '41-6008':   {label:'No reboot', cls:'t-instant',  note:'6008 é gerado no próximo boot, não imediatamente após o crash.',                                        anomaly:'Presença de 6008 sem 41 anterior pode indicar manipulação de log.'},

  // CAMADA 2 — Autenticação
  '4625-4624': {label:'Variável',  cls:'t-variable', note:'Depende do comportamento: brute force pode ter ms entre tentativas; usuário legítimo pode levar minutos.', anomaly:'5+ falhas em < 60s da mesma origem seguidas de sucesso = forte indicador de brute force.'},
  '4625-4740': {via:'SubStatus 0xC000006A (repetido)', label:'< 1 s',     cls:'t-instant',  note:'O bloqueio é aplicado imediatamente após atingir o threshold de falhas configurado na política.',        anomaly:''},
  '4740-4625': {via:'Status 0xC0000234', label:'Variável',  cls:'t-variable', note:'Depois do bloqueio, novas tentativas continuam gerando 4625, agora com Status 0xC0000234.', anomaly:'Tentativas seguindo em conta já bloqueada = ferramenta automatizada que não respeita o lockout.'},
  '4740-4767': {label:'Variável',  cls:'t-variable', note:'Depende de intervenção humana (helpdesk) ou processo automatizado. Pode ser segundos ou horas.',         anomaly:'Desbloqueio imediato (< 30s) sem ticket é suspeito — pode indicar automação maliciosa.'},
  '4767-4624': {label:'< 30 s',    cls:'t-seconds',  note:'Após desbloqueio, o usuário normalmente tenta autenticar em seguida.',                                   anomaly:'Logon de origem diferente da que gerou os 4625 é suspeito.'},
  '4768-4769': {label:'1 – 5 s',   cls:'t-seconds',  note:'TGS solicitado logo após o TGT — tempo de o sistema resolver o serviço de destino.',                    anomaly:'4769 sem nenhum 4768 da mesma conta em qualquer DC durante a validade do TGT (padrão 10 h) sugere ticket forjado (Golden Ticket). Olhar só uma janela curta ou um único DC gera falso positivo.'},
  '4769-4770': {label:'Variável',  cls:'t-variable', note:'Renovação ocorre quando o ticket está próximo do vencimento. Padrão depende do Kerberos MaxTicketAge.',  anomaly:'Múltiplos 4769 de serviços diferentes em < 10s de uma única conta = Kerberoasting.'},
  '4771-4768': {via:'Failure Code 0x18', label:'Variável',  cls:'t-variable', note:'Após falha de pré-autenticação, nova tentativa depende do cliente.',                                     anomaly:''},
  '4776-4624': {label:'< 1 s',     cls:'t-instant',  note:'Validação NTLM e concessão de acesso ocorrem na mesma transação.',                                       anomaly:'Muitos 4776 sem 4624 correspondente indica tentativas NTLM falhando silenciosamente.'},
  '4624-4634': {ai:'Sessões de agente tendem a ser curtas e densas: muitos 4688 numa janela de poucos minutos, sem as pausas de leitura de um humano.', label:'Variável',  cls:'t-variable', note:'Duração da sessão — pode ser segundos (serviço) ou horas (usuário interativo).',                        anomaly:'Sessão com duração < 5s seguida de 4672 é suspeita — pode ser logon de reconhecimento.'},
  '4634-4647': {label:'< 1 s',     cls:'t-instant',  note:'4647 (iniciado pelo usuário) precede 4634 (confirmação do sistema) imediatamente.',                     anomaly:''},

  // CAMADA 3 — Autorização & Sessão
  '4624-4672': {label:'< 1 s',     cls:'t-instant',  note:'Privilégios especiais são atribuídos na mesma transação de logon quando a conta os possui.',             anomaly:'4672 com delay > 5s após 4624 é anômalo — privilégios não deveriam ser concedidos depois do logon.'},
  '4624-4778': {label:'< 2 s',     cls:'t-instant',  note:'Reconexão de sessão RDP ocorre imediatamente após autenticação bem-sucedida.',                          anomaly:'4778 sem 4624 precedente indica reconexão de sessão órfã.'},
  '4778-4779': {label:'Variável',  cls:'t-variable', note:'Tempo de sessão ativa antes da desconexão.',                                                             anomaly:''},
  '4800-4801': {label:'Variável',  cls:'t-variable', note:'Depende de quanto tempo o usuário ficou ausente.',                                                       anomaly:'4801 de origem de rede diferente da sessão original indica acesso não autorizado à estação bloqueada.'},
  '4802-4800': {label:'< 2 s',     cls:'t-instant',  note:'Screensaver ativado e estação bloqueada são praticamente simultâneos.',                                  anomaly:''},

  // CAMADA 4 — Identidade & Grupos
  '4720-4722': {label:'< 5 s',     cls:'t-seconds',  note:'Em processos automatizados (scripts de provisionamento), habilitação ocorre logo após a criação.',       anomaly:'4720 sem 4722 subsequente pode indicar conta criada e mantida desabilitada intencionalmente.'},
  '4720-4728': {label:'< 30 s',    cls:'t-seconds',  note:'Em provisionamento automatizado, adição ao grupo ocorre logo após criação e habilitação.',               anomaly:'4720 → 4728 (Domain Admins) em < 60s fora do horário comercial sem change request é crítico.'},
  '4722-4624': {label:'Variável',  cls:'t-variable', note:'Após habilitação, logon pode ocorrer imediatamente ou após tempo indeterminado.',                        anomaly:'Logon < 30s após 4722 por conta recem-criada indica conta backdoor sendo usada imediatamente.'},
  '4724-4624': {label:'< 60 s',    cls:'t-minutes',  note:'Após reset de senha, o usuário normalmente tenta autenticar em seguida.',                               anomaly:'Reset seguido de logon de IP diferente do solicitante indica comprometimento do fluxo de reset.'},
  '4727-4728': {label:'< 5 s',     cls:'t-seconds',  note:'Criação de grupo e adição do primeiro membro costumam ocorrer na mesma operação de script.',             anomaly:''},
  '4731-4732': {label:'< 5 s',     cls:'t-seconds',  note:'Igual ao global — criação e adição do primeiro membro na mesma operação.',                              anomaly:''},

  // CAMADA 5 — Processos & Serviços
  '4672-4688': {ai:'Um operador humano costuma levar de segundos a minutos entre o logon e os primeiros comandos, com pausas para ler a saída. Um agente emenda comandos em sequência quase contínua desde o primeiro segundo.', label:'1 – 10 s',  cls:'t-seconds',  note:'Após logon privilegiado, processos são iniciados em poucos segundos (shell, explorer, etc.).',           anomaly:'4688 gerando processo de shell (cmd/powershell) < 2s após 4672 de conta de serviço é suspeito.'},
  '4688-4689': {ai:'Padrão típico de agente: um comando por vez, cada um terminando antes do próximo começar (o modelo lê o resultado e decide). Quando um comando falha, o seguinte costuma ser uma variação dele — o agente se adapta e tenta de novo.', label:'Variável',  cls:'t-variable', note:'Duração do processo — pode ser ms (comando rápido) ou horas (serviço contínuo).',                       anomaly:'Processo com duração < 1s que gera muitos 4663 antes de encerrar indica varredura automatizada.'},
  '1149-4624': {label:'< 2 s',     cls:'t-instant',  note:'Com NLA, a autenticação (1149) vem logo antes do logon interativo remoto (Type 10).', anomaly:'1149 sem 4624 Type 10 em seguida = credencial válida testada sem abrir sessão.'},
  '4624-5140': {label:'< 1 s',     cls:'t-instant',  note:'Logon de rede (Type 3) e acesso ao compartilhamento acontecem juntos na sessão SMB.', anomaly:'Acesso a ADMIN$ ou C$ a partir de estação de usuário = forte indicador de movimento lateral.'},
  '5140-5145': {label:'< 1 s',     cls:'t-instant',  note:'Após abrir o compartilhamento, cada arquivo acessado gera 5145 (se a auditoria detalhada estiver ativa).', anomaly:''},
  '5145-7045': {ai:'Mesmo padrão já é rápido com ferramentas automatizadas; com agente, a escolha do alvo seguinte também acontece em segundos, e a sequência se repete em vários hosts em pouco tempo.', label:'< 5 s',     cls:'t-seconds',  note:'Padrão PsExec: binário copiado para ADMIN$ e, em seguida, serviço criado no alvo.', anomaly:'5145 com gravação de .exe em ADMIN$ seguido de 7045 no mesmo host = PsExec ou similar.'},
  '5145-4688': {ai:'Entre copiar a ferramenta e executá-la, um humano leva de segundos a minutos; um agente faz as duas coisas em sequência imediata.', label:'Segundos',  cls:'t-seconds',  note:'Arquivo copiado via compartilhamento é executado no alvo.', anomaly:'Executável recém-copiado por SMB sendo iniciado = transferência de ferramenta (T1570).'},
  '4688-4104': {ai:'Scripts gerados por IA costumam trazer comentários e nomes de variáveis em linguagem natural explicando o raciocínio — no caso JADEPUFFER (Sysdig, 2026), o próprio código descrevia o que o modelo pretendia fazer. Como o código muda a cada execução, hash e assinatura perdem valor; o conteúdo do 4104 e o comportamento continuam úteis.', label:'< 2 s',     cls:'t-instant',  note:'powershell.exe inicia e registra os blocos de script conforme executa.', anomaly:'4688 com -enc/-EncodedCommand: o 4104 mostra o conteúdo já decodificado.'},
  '4697-7045': {label:'< 1 s',     cls:'t-instant',  note:'4697 (Security log) e 7045 (System log) são gerados simultaneamente pelo mesmo evento.',                anomaly:'7045 sem 4697 correspondente indica que a auditoria de segurança pode estar desabilitada.'},
  '7045-7036': {label:'< 5 s',     cls:'t-seconds',  note:'Serviço instalado e iniciado na sequência imediata em instalações automáticas.',                        anomaly:'7045 com nome aleatório (< 8 chars) ou caminho em %TEMP% é forte indicador de PSExec ou similar.'},
  '7036-4688': {label:'< 2 s',     cls:'t-instant',  note:'Processo do serviço é criado imediatamente após o serviço entrar em estado running.',                   anomaly:''},
  '4698-4700': {label:'< 2 s',     cls:'t-instant',  note:'Task criada e habilitada na mesma operação em scripts de persistência.',                                anomaly:'4698 com trigger imediato (< 60s) e caminho em diretório temporário é persistência maliciosa.'},
  '4698-4688': {label:'Depende do trigger', cls:'t-triggered', note:'Execução ocorre apenas quando o trigger configurado disparar (horário, evento, boot, etc.).',  anomaly:''},
  '4700-4688': {label:'Depende do trigger', cls:'t-triggered', note:'Processo executado quando o trigger da task disparar.',                                        anomaly:''},
  '4702-4688': {label:'Depende do trigger', cls:'t-triggered', note:'Após atualização da task, execução segue o novo trigger.',                                    anomaly:''},

  // CAMADA 6 — Objetos & Política
  '4656-4663': {label:'< 100 ms',  cls:'t-instant',  note:'Handle aberto e acesso ao objeto ocorrem na mesma operação.',                                           anomaly:''},
  '4663-4670': {label:'< 100 ms',  cls:'t-instant',  note:'Modificação de permissão ocorre imediatamente após acesso ao objeto.',                                  anomaly:'4670 em massa em múltiplos objetos em < 60s indica alteração de permissões em lote — comum em ransomware.'},
  '4656-4660': {label:'< 1 s',     cls:'t-instant',  note:'Deleção de objeto ocorre imediatamente após abertura do handle com intent to delete.',                  anomaly:''},
  '4661-4662': {label:'< 100 ms',  cls:'t-instant',  note:'Handle de objeto AD aberto e operação realizada na mesma transação.',                                   anomaly:''},
  '4662-4932': {label:'< 5 s',     cls:'t-seconds',  note:'Operação de replicação AD inicia logo após o estabelecimento do contexto de nomenclatura.',             anomaly:'4662 com GUID de replicação originando de host não-DC seguido de 4932 = DCSync.'},
  '4719-1102': {label:'< 60 s',    cls:'t-minutes',  note:'Atacante altera política de auditoria para desabilitar antes de limpar o log.',                         anomaly:'4719 seguido de 1102 em < 5 minutos é sequência clássica de cobertura de rastros.'},

  // NOVOS EVENTOS
  '4719-4906': {label:'< 1 s',     cls:'t-instant',  note:'Mudança na política de auditoria frequentemente acompanha alteração do CrashOnAuditFail para evitar crash.',  anomaly:'Sequência 4719→4906→1102 em < 5 min = supressão deliberada de auditoria.'},
  '4728-4624': {label:'< 30 s',    cls:'t-seconds',  note:'Adição a grupo privilegiado seguida de logon imediato é padrão de escalonamento rápido.',                      anomaly:'Conta recém-criada adicionada a Domain Admins sem ticket ITSM = alto risco.'},
  '4732-4624': {label:'< 30 s',    cls:'t-seconds',  note:'Adição a grupo local Administrators seguida de logon local.',                                                   anomaly:'Fora de horário comercial sem aprovação = suspeito.'},
  '4692-4693': {label:'Variável',  cls:'t-variable', note:'Backup seguido de recovery da chave DPAPI pode indicar extração de credenciais protegidas.',                   anomaly:'Sequência em conta de serviço ou fora de manutenção = possível credential harvesting.'},

  '4928-4932': {label:'< 10 s',    cls:'t-seconds',  note:'Sincronização começa logo após o estabelecimento do contexto de nomenclatura.',                         anomaly:'4928+4932 originando de workstation (não DC) = DCSync em progresso.'},
  '4932-4933': {label:'Variável',  cls:'t-variable', note:'Duração da sincronização depende do volume de dados replicados.',                                        anomaly:'Replicação muito curta (< 1s) de workstation pode indicar dump seletivo de atributos (ex: unicodePwd).'},
  '4932-4934': {label:'< 1 s',     cls:'t-instant',  note:'Atributos são replicados imediatamente durante a sincronização.',                                        anomaly:''},
  '4935-4936': {label:'Variável',  cls:'t-variable', note:'Falha de replicação pode durar segundos ou persistir até intervenção.',                                  anomaly:''},
  '4946-4688': {label:'Variável',  cls:'t-variable', note:'Após criar regra de firewall permissiva, processo de C2 pode conectar em qualquer momento.',            anomaly:'4946 adicionando regra Allow para porta não padrão seguido de 4688 com processo de rede é suspeito.'},
  '4948-4946': {label:'< 30 s',    cls:'t-seconds',  note:'Sequência de remover regra de bloqueio e adicionar regra permissiva é operação comum em configuração.',  anomaly:'Essa sequência em < 10s fora de janela de mudanças indica modificação não autorizada de firewall.'},
};

// ══════════════════════════════════════════════════════════════════
// TREINO — chamado que abre cada incidente e sinais frágeis
// (sinais que parecem bons, mas somem quando a técnica varia)
// ══════════════════════════════════════════════════════════════════
const TRAINING = {
  'brute-force':     {brief:'Um servidor exposto para acesso remoto registrou dezenas de falhas de logon na conta do gerente financeiro, seguidas de um logon bem-sucedido às 02:41. O gerente estava dormindo.',
                      fragile:['A ocorrência de um 4740 (conta bloqueada)','Muitas falhas vindas sempre do mesmo IP']},
  'pass-the-hash':   {brief:'O EDR do servidor de arquivos sinalizou um serviço desconhecido criado às 03:12. A conta usada é de um administrador que está de férias.',
                      fragile:['Um 4624 Type 9 com seclogo na máquina de origem','A criação de um serviço (7045) no destino']},
  'kerberoasting':   {brief:'A conta de um estagiário fez dezenas de pedidos de ticket Kerberos em menos de um minuto, para serviços que ele nunca usou.',
                      fragile:['4769 com Encryption Type 0x17 (RC4)','Mais de dez 4769 em menos de dez segundos']},
  'dcsync':          {brief:'Um alerta do DC01 aponta um pedido de replicação feito a partir de uma estação de trabalho do time de marketing.',
                      fragile:['4662 vindo de uma conta que não é de computador','Eventos de replicação (4928/4932) fora do horário comercial']},
  'persistence-task':{brief:'Toda noite, às 23:00, um servidor de aplicação executa um PowerShell que ninguém do time reconhece.',
                      fragile:['schtasks.exe aparecendo na linha de comando do 4688','Uma tarefa com nome que não parece do Windows']},
  'cover-tracks':    {brief:'Às 14:07, o SRV-APP03 enviou ao SIEM um aviso de log limpo. Ninguém do time de infraestrutura estava fazendo manutenção no servidor.',
                      fragile:['Um evento 1102 (log limpo)','Um evento 4719 (política de auditoria alterada)']},
  'ransomware-obj':  {brief:'Usuários do jurídico relatam arquivos renomeados com uma extensão estranha no compartilhamento do departamento, no servidor de arquivos.',
                      fragile:['4663 de escrita em massa no servidor de arquivos','Um processo com nome de ransomware conhecido']},
  'lateral-psexec':  {brief:'Um binário desconhecido apareceu em C:\\Windows no SRV-FILE02, e um serviço novo foi criado minutos depois.',
                      fragile:['Um serviço chamado PSEXESVC','Um 5145 gravando arquivo em ADMIN$']},
  'password-spray':  {brief:'Às 02:14, o DC01 registrou falhas de autenticação em mais de 300 contas diferentes, todas vindas do mesmo endereço.',
                      fragile:['Um 4740 (conta bloqueada)','Muitas tentativas contra uma mesma conta']},
  'asrep-roast':     {brief:'O DC01 emitiu um TGT sem pré-autenticação para uma conta de serviço, pedido a partir de uma estação de usuário. Dois dias depois, essa conta fez logon num servidor que nunca tinha acessado.',
                      fragile:['4768 com Encryption Type 0x17','Um 4738 alterando UserAccountControl']},
  'silver-ticket':   {brief:'O servidor SQL registrou logons Kerberos de um administrador, mas os DCs não mostram nenhum ticket emitido para esse acesso.',
                      fragile:['Um 4769 pedido para um serviço incomum','Um 4768 com RC4 pouco antes do logon']},
  'backdoor-account':{brief:'O relatório semanal mostra um membro novo em Domain Admins: "svc_backup2". Nenhuma mudança foi aprovada.',
                      fragile:['Um 4720 (conta criada) fora do horário','Um 4728 diretamente no grupo Domain Admins']},
  'lateral-rdp':     {brief:'Um servidor de banco de dados recebeu uma sessão de área de trabalho remota no domingo, com uma conta do suporte.',
                      fragile:['IP de origem fora da rede interna no 1149','mstsc.exe executado na máquina de origem']},
  'lateral-wmi':     {brief:'O EDR registrou um cmd.exe filho de wmiprvse.exe num servidor do RH, sem ninguém logado no console.',
                      fragile:['wmic.exe na linha de comando da origem','PowerShell com -EncodedCommand']},
  'local-recon':     {brief:'Logo depois que um usuário abriu um anexo, o notebook dele começou a consultar a lista de administradores locais.',
                      fragile:['A execução de net.exe','Qualquer evento 4799']},
  'shadow-creds':    {brief:'Um alerta indica alteração no atributo msDS-KeyCredentialLink de uma conta de administrador. A empresa não usa Windows Hello.',
                      fragile:['Qualquer 5136 em msDS-KeyCredentialLink','Um 4768 com RC4']},
};
