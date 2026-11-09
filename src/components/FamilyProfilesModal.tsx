import React, { useState } from 'react';
import { X, Users, Plus, Trash2, Heart, Check, Baby, Shield } from 'lucide-react';
import { FamilyMemberProfile } from '../types';

interface FamilyProfilesModalProps {
  isOpen: boolean;
  onClose: () => void;
  familyMembers: FamilyMemberProfile[];
  onAddMember: (member: FamilyMemberProfile) => void;
  onDeleteMember: (memberId: string) => void;
}

export const FamilyProfilesModal: React.FC<FamilyProfilesModalProps> = ({
  isOpen,
  onClose,
  familyMembers,
  onAddMember,
  onDeleteMember
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [role, setRole] = useState<'bimbo' | 'mamma' | 'papa'>('bimbo');
  const [age, setAge] = useState<number>(5);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    let avatar = '👦';
    let color = 'bg-amber-100 text-amber-800 border-amber-300';
    if (role === 'mamma') {
      avatar = '👩';
      color = 'bg-brand-100 text-brand-700 border-brand-300';
    } else if (role === 'papa') {
      avatar = '👨';
      color = 'bg-blue-100 text-blue-700 border-blue-300';
    } else if (age < 4) {
      avatar = '👧';
      color = 'bg-emerald-100 text-emerald-800 border-emerald-300';
    }

    const newMember: FamilyMemberProfile = {
      id: `fam-${Date.now()}`,
      name: role === 'bimbo' ? `${name.trim()} (${age}a)` : name.trim(),
      role,
      age: role === 'bimbo' ? age : undefined,
      avatar,
      color
    };

    onAddMember(newMember);
    setName('');
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-end sm:items-center p-0 sm:p-4 overflow-y-auto animate-in fade-in duration-200 cursor-pointer"
    >
      
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] sm:max-h-[88vh] flex flex-col relative animate-in slide-in-from-bottom duration-300 cursor-default"
      >
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-petrolio-400" />
            <h2 className="font-extrabold text-lg">Profili Famiglia Palermo</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-6">

          {/* Member List */}
          <div>
            <p className="text-xs font-black uppercase text-slate-400 mb-2">
              Membri della Famiglia ({familyMembers.length})
            </p>
            <div className="space-y-2">
              {familyMembers.map((member) => (
                <div
                  key={member.id}
                  className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-petrolio-100 text-petrolio-700 flex items-center justify-center font-bold">
                      {member.role === 'mamma' ? (
                        <Heart className="w-4 h-4 text-petrolio-600" />
                      ) : member.role === 'papa' ? (
                        <Shield className="w-4 h-4 text-petrolio-600" />
                      ) : (
                        <Baby className="w-4 h-4 text-petrolio-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">
                        {member.name}
                      </h4>
                      <span className="text-[10px] uppercase font-bold text-slate-500 px-2.5 py-0.5 bg-slate-200/70 rounded-full">
                        {member.role}
                      </span>
                    </div>
                  </div>

                  {familyMembers.length > 1 && (
                    <button
                      onClick={() => onDeleteMember(member.id)}
                      className="p-2 text-slate-400 hover:text-brand-500 transition-colors cursor-pointer"
                      title="Elimina profilo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Add New Form */}
          <form onSubmit={handleAdd} className="bg-indigo-50/60 border border-indigo-200/80 p-4 rounded-2xl space-y-3">
            <p className="text-xs font-black uppercase text-indigo-900 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-indigo-600" />
              Aggiungi Mamma, Papà o Bambino
            </p>

            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">
                Ruolo
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('bimbo')}
                  className={`py-2 text-xs font-bold rounded-full border transition-all flex items-center justify-center gap-1.5 ${
                    role === 'bimbo' ? 'bg-petrolio-600 text-white border-petrolio-600' : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  <Baby className="w-3.5 h-3.5" />
                  <span>Bimbo</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('mamma')}
                  className={`py-2 text-xs font-bold rounded-full border transition-all flex items-center justify-center gap-1.5 ${
                    role === 'mamma' ? 'bg-petrolio-600 text-white border-petrolio-600' : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5" />
                  <span>Mamma</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('papa')}
                  className={`py-2 text-xs font-bold rounded-full border transition-all flex items-center justify-center gap-1.5 ${
                    role === 'papa' ? 'bg-petrolio-600 text-white border-petrolio-600' : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Papà</span>
                </button>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">
                Nome
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="es: Luca, Marina, Marco..."
                className="w-full bg-white border border-slate-200 rounded-full px-4 py-2 text-xs font-bold text-slate-800 outline-none focus:border-indigo-500"
                required
              />
            </div>

            {role === 'bimbo' && (
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Età (Anni): {age}
                </label>
                <input
                  type="range"
                  min={0}
                  max={16}
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2.5 rounded-full shadow-md transition-all cursor-pointer"
            >
              Salva Profilo
            </button>
          </form>

        </div>

      </div>

    </div>
  );
};
