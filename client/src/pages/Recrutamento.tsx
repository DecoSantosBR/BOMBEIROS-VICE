import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { trpc } from "@/lib/trpc";

export default function Recrutamento() {
  const [, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const discordId = searchParams.get("discord_id");
  const discordUsername = searchParams.get("discord_username");

  const [formData, setFormData] = useState({
    nome: "",
    idViceCity: "",
    telefone: "",
    idade: "",
    interesse: "",
    possuiMicrofone: "sim" as "sim" | "nao",
    regrasIlegais: "",
    ordemSuperior: "",
    tiroteio: "",
    multiplasOcorrencias: "",
  });

  const submitMutation = trpc.recruitment.submit.useMutation({
    onSuccess: () => {
      alert("Formulário enviado! Seu formulário foi enviado para análise. Aguarde a aprovação de um recrutador.");
      setTimeout(() => setLocation("/"), 3000);
    },
    onError: (error) => {
      alert(error.message || "Erro ao enviar formulário. Tente novamente mais tarde.");
    },
  });

  useEffect(() => {
    if (!discordId || !discordUsername) {
      alert("Link inválido. Use o comando /solicitar_set no Discord para gerar um novo link.");
      setTimeout(() => setLocation("/"), 3000);
    }
  }, [discordId, discordUsername, setLocation]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação
    if (!formData.nome || !formData.idViceCity || !formData.telefone || !formData.idade) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Pergunta eliminatória
    if (formData.possuiMicrofone === "nao") {
      alert("É obrigatório possuir microfone e disponibilidade para ficar em call durante o patrulhamento.");
      return;
    }

    if (!discordId || !discordUsername) {
      alert("Informações do Discord não encontradas.");
      return;
    }

    submitMutation.mutate({
      discordId,
      discordUsername,
      ...formData,
    });
  };

  if (!discordId || !discordUsername) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader className="bg-red-700 text-white">
            <CardTitle className="text-2xl">Formulário de Recrutamento</CardTitle>
            <CardDescription className="text-gray-100">
              1º CBM Vice City - Corpo de Bombeiros Militar
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Pergunta 1 */}
              <div>
                <Label htmlFor="nome" className="text-base font-semibold">
                  1. Nome completo do personagem em Vice City *
                </Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => handleChange("nome", e.target.value)}
                  placeholder="Ex: João Silva"
                  required
                  className="mt-2"
                />
              </div>

              {/* Pergunta 2 */}
              <div>
                <Label htmlFor="idViceCity" className="text-base font-semibold">
                  2. ID no Vice City *
                </Label>
                <Input
                  id="idViceCity"
                  value={formData.idViceCity}
                  onChange={(e) => handleChange("idViceCity", e.target.value)}
                  placeholder="Ex: 12345"
                  required
                  className="mt-2"
                />
              </div>

              {/* Pergunta 3 */}
              <div>
                <Label htmlFor="telefone" className="text-base font-semibold">
                  3. Telefone no RP *
                </Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => handleChange("telefone", e.target.value)}
                  placeholder="Ex: 555-1234"
                  required
                  className="mt-2"
                />
              </div>

              {/* Pergunta 4 */}
              <div>
                <Label htmlFor="idade" className="text-base font-semibold">
                  4. Qual é a sua idade em NÁRNIA (vida real)? *
                </Label>
                <Input
                  id="idade"
                  type="number"
                  value={formData.idade}
                  onChange={(e) => handleChange("idade", e.target.value)}
                  placeholder="Ex: 25"
                  required
                  min="1"
                  className="mt-2"
                />
              </div>

              {/* Pergunta 5 */}
              <div>
                <Label htmlFor="interesse" className="text-base font-semibold">
                  5. Qual seu interesse em fazer parte da corporação do bombeiro? *
                </Label>
                <Textarea
                  id="interesse"
                  value={formData.interesse}
                  onChange={(e) => handleChange("interesse", e.target.value)}
                  placeholder="Descreva seu interesse..."
                  required
                  rows={4}
                  className="mt-2"
                />
              </div>

              {/* Pergunta 6 - Eliminatória */}
              <div>
                <Label className="text-base font-semibold text-red-700">
                  6. Você possui microfone e disponibilidade para ficar em call do Discord do bombeiro durante seu patrulhamento? (pergunta eliminatória) *
                </Label>
                <RadioGroup
                  value={formData.possuiMicrofone}
                  onValueChange={(value) => handleChange("possuiMicrofone", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim" id="mic-sim" />
                    <Label htmlFor="mic-sim">Sim</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="mic-nao" />
                    <Label htmlFor="mic-nao">Não</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Pergunta 7 */}
              <div>
                <Label htmlFor="regrasIlegais" className="text-base font-semibold">
                  7. Você está ciente que é EXTREMAMENTE proibido o envolvimento de bombeiro com coisas ilegais (farm, venda de drogas, desmanche de veículo) mesmo que você não esteja em serviço (fora do ponto)? *
                </Label>
                <Textarea
                  id="regrasIlegais"
                  value={formData.regrasIlegais}
                  onChange={(e) => handleChange("regrasIlegais", e.target.value)}
                  placeholder="Sim, estou ciente / Não estou ciente"
                  required
                  rows={2}
                  className="mt-2"
                />
              </div>

              {/* Pergunta 8 */}
              <div>
                <Label htmlFor="ordemSuperior" className="text-base font-semibold">
                  8. Você desobedeceria uma ordem de um superior (patente acima)? Explique o porquê! *
                </Label>
                <Textarea
                  id="ordemSuperior"
                  value={formData.ordemSuperior}
                  onChange={(e) => handleChange("ordemSuperior", e.target.value)}
                  placeholder="Explique sua resposta..."
                  required
                  rows={4}
                  className="mt-2"
                />
              </div>

              {/* Pergunta 9 */}
              <div>
                <Label htmlFor="tiroteio" className="text-base font-semibold">
                  9. O que você faria se recebesse um chamado estando em patrulhamento, e chegando ao local presenciasse um tiroteio entre polícia e bandido? *
                </Label>
                <Textarea
                  id="tiroteio"
                  value={formData.tiroteio}
                  onChange={(e) => handleChange("tiroteio", e.target.value)}
                  placeholder="Descreva o que você faria..."
                  required
                  rows={4}
                  className="mt-2"
                />
              </div>

              {/* Pergunta 10 */}
              <div>
                <Label htmlFor="multiplasOcorrencias" className="text-base font-semibold">
                  10. O que você faria se estivesse a caminho de uma ocorrência e, cruzasse com uma vítima (de outro chamado) precisando de atendimento? *
                </Label>
                <Textarea
                  id="multiplasOcorrencias"
                  value={formData.multiplasOcorrencias}
                  onChange={(e) => handleChange("multiplasOcorrencias", e.target.value)}
                  placeholder="Descreva o que você faria..."
                  required
                  rows={4}
                  className="mt-2"
                />
              </div>

              <div className="pt-6 border-t">
                <Button
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="w-full bg-red-700 hover:bg-red-800 text-white"
                >
                  {submitMutation.isPending ? "Enviando..." : "Confirmar e Enviar"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
