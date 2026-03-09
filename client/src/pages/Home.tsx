import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Users, Award, LogOut, Heart, Shield, UsersRound } from "lucide-react";
import { CertificateGenerator } from "@/components/CertificateGenerator";

export default function Home() {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated, loading } = useAuth();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      setLocation("/login");
    }
  }, [loading, isAuthenticated, setLocation]);

  const { data: courses, isLoading: coursesLoading } = trpc.courses.list.useQuery();

  const handleLogout = () => {
    window.location.href = "/api/auth/logout";
  };

  if (loading || coursesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Carregando...</h1>
        </div>
      </div>
    );
  }

  const isAdmin = user?.role === "admin";
  const isInstructor = user?.role === "instructor";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-red-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663187653950/VZqdIOMlfuNYVhdk.png" 
                alt="CBM Pecado Logo" 
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold text-white">1º CBM Pecado</h1>
                <p className="text-red-100 text-sm">Corpo de Bombeiros Militar</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/calendario">
                <Button variant="outline" className="bg-white text-red-700 hover:bg-red-50 border-white">
                  <Calendar className="mr-2 h-4 w-4" />
                  Calendário
                </Button>
              </Link>
              {isAdmin && (
                <>
                  <Link href="/admin/usuarios">
                    <Button variant="outline" className="bg-white text-red-700 hover:bg-red-50 border-white">
                      <Users className="mr-2 h-4 w-4" />
                      Usuários
                    </Button>
                  </Link>
                  <Link href="/admin/inscricoes">
                    <Button variant="outline" className="bg-white text-red-700 hover:bg-red-50 border-white">
                      <Award className="mr-2 h-4 w-4" />
                      Inscrições
                    </Button>
                  </Link>
                </>
              )}
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="bg-white text-red-700 hover:bg-red-50 border-white"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 1º Hero Section: FORÇA & HONRA */}
      <section className="bg-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-6">FORÇA & HONRA</h2>
              <p className="text-xl mb-4 text-red-100">
                Sistema de certificação e registro do Corpo de Bombeiros Militar de Pecado.
              </p>
              <p className="text-lg text-red-100">
                Dedicação total à proteção e ao serviço da comunidade.
              </p>
            </div>
            <div className="flex justify-center">
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663187653950/VZqdIOMlfuNYVhdk.png" 
                alt="CBM Pecado Logo" 
                className="w-64 h-64 rounded-full shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2º Painel de Instrutores */}
      {(isInstructor || isAdmin) && (
        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4 text-red-700">Painel de Instrutores</h2>
            <p className="text-gray-600 mb-6">
              Acesse as ferramentas exclusivas para instrutores e administradores
            </p>
            <Button 
              size="lg"
              className="bg-red-700 text-white hover:bg-red-800 font-bold"
              onClick={() => {
                document.getElementById('gerador-certificados')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Acessar Ferramentas
            </Button>
          </div>
        </section>
      )}

      {/* 3º NOSSA MISSÃO */}
      <section className="py-16 bg-red-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">NOSSA MISSÃO</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* CORAGEM */}
            <Card className="p-8 text-center hover:shadow-xl transition-shadow bg-white">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-red-700" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-red-700">CORAGEM</h3>
              <p className="text-gray-600">
                Enfrentar os desafios com bravura e determinação, protegendo vidas e patrimônio.
              </p>
            </Card>

            {/* DISCIPLINA */}
            <Card className="p-8 text-center hover:shadow-xl transition-shadow bg-white">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-red-700" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-red-700">DISCIPLINA</h3>
              <p className="text-gray-600">
                Manter a ordem e o profissionalismo em todas as operações e atividades.
              </p>
            </Card>

            {/* ESPÍRITO DE EQUIPE */}
            <Card className="p-8 text-center hover:shadow-xl transition-shadow bg-white">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <UsersRound className="w-8 h-8 text-red-700" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-red-700">ESPÍRITO DE EQUIPE</h3>
              <p className="text-gray-600">
                Trabalhar unidos como uma equipe coesa, onde cada membro é essencial.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 4º Cursos Disponíveis */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">NOSSOS CURSOS</h2>
          <p className="text-center text-gray-600 mb-12">
            Escolha um curso para ver detalhes e se inscrever
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses?.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                {course.imageUrl && (
                  <img 
                    src={course.imageUrl} 
                    alt={course.nome}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{course.nome}</h3>
                  <p className="text-red-700 font-bold text-lg mb-4">{course.valor}</p>
                  <Link href={`/curso/${course.id}`}>
                    <Button className="w-full bg-red-700 hover:bg-red-800 text-white">
                      Ver Mais
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5º e 6º Gerador de Certificados */}
      {(isInstructor || isAdmin) && (
        <section id="gerador-certificados" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CertificateGenerator />
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-red-950 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-200">
            © 2026 1º CBM Pecado - Corpo de Bombeiros Militar
          </p>
          <p className="text-red-300 text-sm mt-2">
            FORÇA & HONRA
          </p>
        </div>
      </footer>
    </div>
  );
}
