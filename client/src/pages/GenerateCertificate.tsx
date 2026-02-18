import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Download, FileText, Loader2 } from "lucide-react";

export default function GenerateCertificate() {
  const { user, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    courseName: "",
    instructorName: user?.name || "",
    instructorRank: (user?.rank || "Tenente-Coronel") as "Comandante Geral" | "Subcomandante Geral" | "Coronel" | "Tenente-Coronel" | "Major" | "Capitão" | "1º Tenente" | "2º Tenente" | "Aspirante" | "Subtenente" | "Sargento" | "Cabo" | "Soldado",
    auxiliar: "",
    auxiliarMatricula: "",
  });
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

  const generateMutation = trpc.certificates.generateAndDownload.useMutation({
    onSuccess: (data) => {
      setGeneratedUrl(data.certificateUrl);
      alert(data.message);
    },
    onError: (error) => {
      alert(`Erro ao gerar certificado: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.studentName || !formData.studentId || !formData.courseName) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    generateMutation.mutate(formData);
  };

  const handleDownload = () => {
    if (generatedUrl) {
      window.open(generatedUrl, "_blank");
    }
  };

  if (!isAuthenticated || (user?.role !== "instructor" && user?.role !== "admin")) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-950 flex items-center justify-center p-4">
        <Card className="p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Acesso Negado</h2>
          <p className="text-gray-600 mb-6">
            Apenas instrutores e administradores podem gerar certificados.
          </p>
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-950 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-white hover:bg-red-800">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                <FileText className="h-8 w-8" />
                Gerar Certificado
              </h1>
              <p className="text-red-200 mt-1">
                Preencha os dados para gerar um certificado
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dados do Aluno */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                Dados do Aluno
              </h2>
              
              <div>
                <Label htmlFor="studentName">Nome Completo *</Label>
                <Input
                  id="studentName"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  placeholder="Ex: João Silva"
                  required
                />
              </div>

              <div>
                <Label htmlFor="studentId">Matrícula *</Label>
                <Input
                  id="studentId"
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  placeholder="Ex: 12345"
                  required
                />
              </div>
            </div>

            {/* Dados do Curso */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                Dados do Curso
              </h2>
              
              <div>
                <Label htmlFor="courseName">Nome do Curso *</Label>
                <Input
                  id="courseName"
                  value={formData.courseName}
                  onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                  placeholder="Ex: Curso de Formação de Bombeiros"
                  required
                />
              </div>
            </div>

            {/* Dados do Instrutor */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                Dados do Instrutor
              </h2>
              
              <div>
                <Label htmlFor="instructorName">Nome do Instrutor *</Label>
                <Input
                  id="instructorName"
                  value={formData.instructorName}
                  onChange={(e) => setFormData({ ...formData, instructorName: e.target.value })}
                  placeholder="Ex: Maria Santos"
                  required
                />
              </div>

              <div>
                <Label htmlFor="instructorRank">Patente do Instrutor *</Label>
                <select
                  id="instructorRank"
                  value={formData.instructorRank}
                  onChange={(e) => setFormData({ ...formData, instructorRank: e.target.value as typeof formData.instructorRank })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="Comandante Geral">Comandante Geral</option>
                  <option value="Subcomandante Geral">Subcomandante Geral</option>
                  <option value="Coronel">Coronel</option>
                  <option value="Tenente-Coronel">Tenente-Coronel</option>
                  <option value="Major">Major</option>
                  <option value="Capitão">Capitão</option>
                  <option value="1º Tenente">1º Tenente</option>
                  <option value="2º Tenente">2º Tenente</option>
                  <option value="Aspirante">Aspirante</option>
                  <option value="Subtenente">Subtenente</option>
                  <option value="Sargento">Sargento</option>
                  <option value="Cabo">Cabo</option>
                  <option value="Soldado">Soldado</option>
                </select>
              </div>
            </div>

            {/* Dados do Auxiliar (Opcional) */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                Auxiliar (Opcional)
              </h2>
              
              <div>
                <Label htmlFor="auxiliar">Nome do Auxiliar</Label>
                <Input
                  id="auxiliar"
                  value={formData.auxiliar}
                  onChange={(e) => setFormData({ ...formData, auxiliar: e.target.value })}
                  placeholder="Ex: Pedro Costa"
                />
              </div>

              <div>
                <Label htmlFor="auxiliarMatricula">Matrícula do Auxiliar</Label>
                <Input
                  id="auxiliarMatricula"
                  value={formData.auxiliarMatricula}
                  onChange={(e) => setFormData({ ...formData, auxiliarMatricula: e.target.value })}
                  placeholder="Ex: 67890"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-red-600 hover:bg-red-700"
                disabled={generateMutation.isPending}
              >
                {generateMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Gerar Certificado
                  </>
                )}
              </Button>

              {generatedUrl && (
                <Button
                  type="button"
                  onClick={handleDownload}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Fazer Download
                </Button>
              )}
            </div>
          </form>

          {/* Success Message */}
          {generatedUrl && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">
                ✅ Certificado gerado com sucesso!
              </p>
              <p className="text-green-600 text-sm mt-1">
                Clique no botão "Fazer Download" para baixar o certificado.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
